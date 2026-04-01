export type ActorRole = "guest" | "farmer" | "supplier" | "admin";

export interface AuthFoundation {
  sessionStrategy: "session-cookie";
  roles: readonly ActorRole[];
}

export const authFoundation: AuthFoundation = {
  sessionStrategy: "session-cookie",
  roles: ["guest", "farmer", "supplier", "admin"],
};

export function canAccessBackoffice(role: ActorRole): boolean {
  return role === "admin";
}

export function canAccessPortal(role: ActorRole): boolean {
  return role === "farmer" || role === "supplier" || role === "admin";
}
