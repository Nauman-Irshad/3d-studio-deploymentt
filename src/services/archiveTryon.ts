import { tryOnUploadFilename } from "../utils/imageUtils";
import { apiUrl } from "./api";

export async function archiveTryonSession(params: {
  human: Blob;
  garment: Blob;
  result: Blob;
  garmentLabel: string;
  page: "men" | "ladies";
}): Promise<void> {
  try {
    const fd = new FormData();
    fd.append("human_img", params.human, tryOnUploadFilename(params.human, "person"));
    fd.append("garm_img", params.garment, tryOnUploadFilename(params.garment, "garment"));
    fd.append("result_img", params.result, "result.jpg");
    fd.append("garment_label", params.garmentLabel);
    fd.append("page", params.page);
    const res = await fetch(apiUrl("/api/archive/tryon"), { method: "POST", body: fd });
    if (!res.ok) {
      console.warn("[archive] save failed", res.status);
    }
  } catch (e) {
    console.warn("[archive] save error", e);
  }
}
