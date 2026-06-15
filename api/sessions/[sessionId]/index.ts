import { head } from "@vercel/blob";

export const config = { runtime: "nodejs" };

const CORS = { "Access-Control-Allow-Origin": "*" };

function sessionIdFromRequest(req: Request): string | null {
  const m = new URL(req.url).pathname.match(/\/api\/sessions\/([^/]+)\/?$/);
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
      return Response.json({ ready: false, detail: "missing session" }, { status: 400, headers: CORS });
    }
    try {
      const photo = await head(`sessions/${sessionId}.jpg`);
      return Response.json({ ready: !!photo }, { headers: CORS });
    } catch {
      return Response.json({ ready: false }, { headers: CORS });
    }
  } catch (e) {
    return Response.json(
      { ready: false, detail: e instanceof Error ? e.message : "server error" },
      { status: 500, headers: CORS },
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
