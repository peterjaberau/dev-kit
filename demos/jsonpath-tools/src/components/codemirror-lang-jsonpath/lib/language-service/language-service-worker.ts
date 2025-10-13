import { LanguageServiceBackend } from "./language-service-backend";

if (typeof self !== "undefined" && typeof self.postMessage === "function") {
  const backend = new LanguageServiceBackend(d => postMessage(d));
  addEventListener("message", e => backend.receiveFromFrontend(e.data));
}
