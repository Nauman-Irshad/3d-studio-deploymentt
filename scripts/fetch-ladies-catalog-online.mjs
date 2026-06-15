/**
 * Downloads royalty-free sample images (Unsplash / Pexels) into ladies all work/*
 * then runs sync-ladies-catalog. Re-run safe: skips files that already exist.
 *
 * Usage: npm run fetch:ladies-catalog
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const seedPath = path.join(__dirname, "ladies-catalog-seed.json");
const sourceRoot = path.join(root, "ladies all work");

const MIN_BYTES = 8_000;
const CONCURRENCY = 4;

async function downloadOne(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size >= MIN_BYTES) {
    return { status: "skipped", dest };
  }

  const res = await fetch(url, {
    headers: { "User-Agent": "TryKurti-Catalog-Seed/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < MIN_BYTES) throw new Error(`too small (${buf.length} bytes)`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return { status: "saved", dest, bytes: buf.length };
}

async function runPool(tasks, limit) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => worker()));
  return results;
}

async function main() {
  if (!fs.existsSync(seedPath)) {
    console.error(`[fetch-ladies-catalog] Missing seed file: ${seedPath}`);
    process.exit(1);
  }

  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  fs.mkdirSync(sourceRoot, { recursive: true });

  let saved = 0;
  let skipped = 0;
  let failed = 0;

  for (const cat of seed.categories ?? []) {
    const folder = String(cat.folder || "").trim();
    if (!folder) continue;
    const destDir = path.join(sourceRoot, folder);
    fs.mkdirSync(destDir, { recursive: true });

    const tasks = (cat.items ?? []).map((item) => async () => {
      const name = String(item.name || "").trim();
      const url = String(item.url || "").trim();
      if (!name || !url) return;
      const dest = path.join(destDir, name);
      try {
        const result = await downloadOne(url, dest);
        if (result.status === "saved") {
          saved++;
          console.log(`  + ${folder}/${name} (${result.bytes} bytes)`);
        } else {
          skipped++;
        }
      } catch (e) {
        failed++;
        console.warn(
          `  ! ${folder}/${name}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    });

    console.log(`[fetch-ladies-catalog] ${folder} (${tasks.length} urls)`);
    await runPool(tasks, CONCURRENCY);
  }

  console.log(
    `[fetch-ladies-catalog] Done — saved ${saved}, skipped ${skipped}, failed ${failed}`,
  );

  const sync = spawnSync(process.execPath, [path.join(__dirname, "sync-ladies-catalog.mjs")], {
    stdio: "inherit",
    cwd: root,
  });
  process.exit(sync.status ?? 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
