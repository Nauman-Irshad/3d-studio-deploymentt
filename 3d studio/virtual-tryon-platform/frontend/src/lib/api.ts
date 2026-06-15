const base = import.meta.env.VITE_API_BASE ?? "";

export async function postTryOn(person: Blob, garment: Blob): Promise<Blob> {
  const fd = new FormData();
  fd.append("person", person, "person.png");
  fd.append("garment", garment, "garment.png");
  const url = `${base}/api/try-on`;
  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }
  return res.blob();
}

export async function getHealth(): Promise<{ status: string; mode: string }> {
  const res = await fetch(`${base}/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
