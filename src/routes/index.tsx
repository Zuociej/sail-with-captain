import { createFileRoute } from "@tanstack/react-router";

import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Trips } from "@/components/site/Trips";
import { WhatIDo } from "@/components/site/WhatIDo";
import { WhoIAm } from "@/components/site/WhoIAm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pożegluj sobie ze mną — babskie rejsy z kapitanką" },
      {
        name: "description",
        content:
          "Ekskluzywne babskie rejsy pod okiem doświadczonej kapitanki jachtowej: Grecja, Chorwacja, Mazury, Jeziorak. Małe załogi, pełne wsparcie, zero rywalizacji.",
      },
      { property: "og:title", content: "Pożegluj sobie ze mną — babskie rejsy z kapitanką" },
      {
        property: "og:description",
        content: "Babskie rejsy morskie i jeziorne: Grecja, Chorwacja, Mazury, Jeziorak. Maksymalnie 8 kobiet na pokładzie.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <WhoIAm />
        <WhatIDo />
        <Trips />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
