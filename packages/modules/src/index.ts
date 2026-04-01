import { z } from "zod";

export const moduleNames = [
  "access",
  "analytics",
  "billing",
  "catalog",
  "farmer",
  "integration",
  "notification",
  "order",
  "recommendation",
  "supplier",
] as const;

export const moduleNameSchema = z.enum(moduleNames);

export interface ModuleDescriptor {
  name: (typeof moduleNames)[number];
  layer: "domain" | "application" | "infrastructure";
}

export const moduleRegistry: ModuleDescriptor[] = moduleNames.map((name) => ({
  name,
  layer: "application",
}));
