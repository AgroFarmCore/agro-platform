import { authFoundation } from "@agro/auth";
import { moduleNames } from "@agro/modules";
import { AppFrame, Stack, Surface } from "@agro/ui";

export default function PortalHomePage() {
  return (
    <main>
      <AppFrame eyebrow="Portal" title="Farmer and supplier workspace">
        <Surface
          title="Roles"
          description={`Foundation supports roles: ${authFoundation.roles.join(", ")}.`}
        />
        <Stack>
          {moduleNames.slice(0, 4).map((moduleName) => (
            <Surface
              key={moduleName}
              title={moduleName}
              description="Module integration point reserved for application use cases and authenticated screens."
            />
          ))}
        </Stack>
      </AppFrame>
    </main>
  );
}
