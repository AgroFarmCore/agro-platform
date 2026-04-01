export const observabilityFoundation = {
  logging: "console",
  tracing: "optional",
  metrics: "optional",
} as const;

export function logInfo(
  message: string,
  context?: Record<string, unknown>,
): void {
  console.log("[agro]", message, context ?? {});
}
