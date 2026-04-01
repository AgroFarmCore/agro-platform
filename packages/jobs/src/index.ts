import { z } from "zod";

export const queueNames = {
  notifications: "notifications",
  recommendations: "recommendations",
  integrations: "integrations",
  analytics: "analytics",
} as const;

export const queueConnectionSchema = z.object({
  REDIS_URL: z.string().min(1),
});

export const jobPayloadSchemas = {
  "notification.send-email": z.object({
    recipient: z.string().email(),
    template: z.string().min(1),
  }),
  "recommendation.refresh-farm": z.object({
    farmId: z.string().min(1),
  }),
} as const;

export const defaultJobOptions = {
  attempts: 5,
  removeOnComplete: 100,
  backoff: {
    type: "exponential" as const,
    delay: 5_000,
  },
};
