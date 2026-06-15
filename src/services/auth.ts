import { websitePath } from "../constants/websiteUrls";

export function loginUrl(): string {
  return websitePath("/login");
}

export function signupUrl(): string {
  return websitePath("/signup");
}
