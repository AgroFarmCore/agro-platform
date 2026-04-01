import { canAccessBackoffice } from "@agro/auth";
import { AppFrame, Surface } from "@agro/ui";

export default function BackofficeHomePage() {
  return (
    <main>
      <AppFrame eyebrow="Backoffice" title="Internal operations foundation">
        <Surface
          title="Access policy"
          description={`Admin access available: ${String(canAccessBackoffice("admin"))}.`}
        />
        <Surface
          title="Operational scope"
          description="This app is reserved for moderation, support tooling, analytics dashboards and internal workflows."
        />
      </AppFrame>
    </main>
  );
}
