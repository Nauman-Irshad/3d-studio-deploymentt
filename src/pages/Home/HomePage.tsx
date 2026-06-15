import { TryOnApp } from "../Product/TryOnApp";
import { MEN_TRYON_CONFIG } from "../../constants/tryOnConfig";

export function HomePage() {
  return <TryOnApp config={MEN_TRYON_CONFIG} />;
}
