import { ChevronDown, Compass, Ship, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Jacht żaglowy na morzu o zachodzie słońca"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/60" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 text-center text-navy-foreground">
        <span className="eyebrow">
  Babskie rejsy Grecja, Chorwacja, Mazury i Jeziorak · {new Date().getFullYear()}
</span>
        <h1 className="mt-6 text-balance text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Złap wiatr razem
          <span className="block italic text-gold">z Kapitanką</span>
        </h1>
        <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
          Ekskluzywne rejsy tylko dla kobiet — od pierwszego węzła po samodzielne
          wejście do portu. Bez oceniania, bez pośpiechu, z pełnym morzem wolności.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="gold">
            <a href="#rejsy">
              <Ship className="h-4 w-4" />
              Zobacz rejsy
            </a>
          </Button>
          <Button asChild size="lg" variant="ghostLight">
            <a href="#kim-jestem">Poznaj Kapitankę</a>
          </Button>
        </div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-navy-foreground/15 pt-8 text-navy-foreground/80">
          {[
            { icon: Waves, value: "ILE", label: "mil morskich" },
            { icon: Compass, value: "ILElat", label: "za sterem" },
            { icon: Ship, value: "ILE", label: "żeglarek na pokładzie" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <span className="font-display text-2xl">{value}</span>
              <span className="text-[0.7rem] uppercase tracking-[0.16em]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#kim-jestem"
        aria-label="Przewiń w dół"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-navy-foreground/60 transition-colors hover:text-gold"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
