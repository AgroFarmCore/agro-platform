import { Worker } from "bullmq";
import IORedis from "ioredis";
import { readConfig } from "@agro/config";
import { queueNames } from "@agro/jobs";

export function bootstrapWorkers() {
  const config = readConfig();
  const connection = new IORedis(config.REDIS_URL, {
    maxRetriesPerRequest: null,
  });

  const notificationsWorker = new Worker(
    queueNames.notifications,
    async (job) => {
      console.log("[worker] received notification job", job.name, job.data);
    },
    { connection },
  );

  return {
    connection,
    workers: [notificationsWorker],
  };
}
