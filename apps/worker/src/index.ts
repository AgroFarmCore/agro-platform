import { bootstrapWorkers } from "./bootstrap/index.js";

const runtime = bootstrapWorkers();

console.log("[worker] scaffold started", {
  workers: runtime.workers.length,
});
