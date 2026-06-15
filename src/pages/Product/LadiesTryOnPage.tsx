import { TryOnApp } from "./TryOnApp";
import { LADIES_TRYON_CONFIG } from "../../constants/tryOnConfig";

export function LadiesTryOnPage() {
  return <TryOnApp config={LADIES_TRYON_CONFIG} />;
}
