import { head, put } from "@vercel/blob";

export const config = { runtime: "nodejs" };

const CORS = { "Access-Control-Allow-Origin": "*" };

function sessionIdFromRequest(req: Request): string | null {
  const m = new URL(req.url).pathname.match(/\/api\/sessions\/([^/]+)\/photo\/?$/);
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

async function resolveSessionId(
  req: Request,
  ctx?: { params?: { sessionId?: string } | Promise<{ sessionId?: string }> },
): Promise<string | null> {
  const fromUrl = sessionIdFromRequest(req);
  if (fromUrl) return fromUrl;
  if (!ctx?.params) return null;
  const p = await Promise.resolve(ctx.params);
  return p?.sessionId ?? null;
}

export async function GET(
  req: Request,
  ctx?: { params?: { sessionId?: string } | Promise<{ sessionId?: string }> },
): Promise<Response> {
  try {
    const sessionId = await resolveSessionId(req, ctx);
    if (!sessionId) {
      return new Response("Not found", { status: 404, headers: CORS });
    }
    const key = `sessions/${sessionId}.jpg`;
    try {
      const meta = await head(key);
      if (!meta?.url) {
        return new Response("Not found", { status: 404, headers: CORS });
      }
      const img = await fetch(meta.url);
      return new Response(await img.arrayBuffer(), {
        headers: {
          ...CORS,
          "Content-Type": meta.contentType || "image/jpeg",
        },
      });
    } catch {
      return new Response("Not found", { status: 404, headers: CORS });
    }
  } catch {
    return new Response("Server error", { status: 500, headers: CORS });
  }
}

export async function POST(
  req: Request,
  ctx?: { params?: { sessionId?: string } | Promise<{ sessionId?: string }> },
): Promise<Response> {
  try {
    const sessionId = await resolveSessionId(req, ctx);
    if (!sessionId) {
      return Response.json({ detail: "missing session" }, { status: 400, headers: CORS });
    }
    const form = await req.formData();
    const photo = form.get("photo");
    if (!photo || !(photo instanceof Blob)) {
      return Response.json({ detail: "Missing photo" }, { status: 400, headers: CORS });
    }

    await put(`sessions/${sessionId}.jpg`, photo, {
      access: "public",
      addRandomSuffix: false,
      contentType: photo.type || "image/jpeg",
    });

    return Response.json({ status: "ok" }, { headers: CORS });
  } catch (e) {
    return Response.json(
      { detail: e instanceof Error ? e.message : "upload failed" },
      { status: 500, headers: CORS },
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
