import { publicSiteSections } from "@agro/content";
import { AppFrame, Stack, Surface } from "@agro/ui";

export default function HomePage() {
  return (
    <main>
      <AppFrame eyebrow="Public web" title="Agro Platform foundation">
        <Stack>
          {publicSiteSections.map((section) => (
            <Surface
              key={section.slug}
              title={section.title}
              description={section.summary}
            />
          ))}
        </Stack>
      </AppFrame>
    </main>
  );
}
