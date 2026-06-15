import { head } from "@vercel/blob";

export const config = { runtime: "nodejs" };

export async function POST(): Promise<Response> {
  const sessionId = crypto.randomUUID().replace(/-/g, "");
  return Response.json(
    { session_id: sessionId },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
