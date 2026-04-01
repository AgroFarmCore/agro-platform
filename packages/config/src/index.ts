import { z } from "zod";

export const envSchema = z.object({
  APP_ENV: z.enum(["local", "test", "staging", "production"]).default("local"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z
    .string()
    .min(1)
    .default("postgresql://postgres:postgres@localhost:5432/agro"),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
});

export type AppConfigShape = z.infer<typeof envSchema>;

export function readConfig(
  source: NodeJS.ProcessEnv = process.env,
): AppConfigShape {
  return envSchema.parse(source);
}

export const configFoundation = readConfig({
  APP_ENV: "local",
  NODE_ENV: "development",
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/agro",
  REDIS_URL: "redis://localhost:6379",
});
