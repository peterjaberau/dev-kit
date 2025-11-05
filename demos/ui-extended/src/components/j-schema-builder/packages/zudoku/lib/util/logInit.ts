import log from "loglevel"

log.setDefaultLevel("silent")

if (process.env.NODE_ENV === "development") {
  log.setLevel("debug")
} else if (typeof window !== "undefined" && localStorage.getItem("ENABLE_DEBUG_LOGS")) {
  log.setLevel("debug")
}
