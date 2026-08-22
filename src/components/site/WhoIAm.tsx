import { Quote } from "lucide-react";

import captain from "@/assets/captain.jpg";
import { useSiteData } from "@/lib/site-data";

export function WhoIAm() {
  const { content } = useSiteData();

  return (
    <section id="kim-jestem" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="relative">
          <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-sm border border-gold/40 lg:block" />
          <img
            src={captain}
            alt="Kapitanka za sterem jachtu"
            loading="lazy"
            width={1024}
            height={1280}
            className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
          />
        </div>

        <div>
          <span className="eyebrow">Kim jestem</span>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Kapitanka, która wierzy w kobiece załogi
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
            {content.about.body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-9 flex gap-4 border-l-2 border-gold bg-secondary/60 p-6">
            <Quote className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="font-display text-xl italic leading-snug text-foreground">
              Morze nie pyta, czy jesteś gotowa. Ale ja Cię do niego przygotuję.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
