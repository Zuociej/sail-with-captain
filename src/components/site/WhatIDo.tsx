import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteData } from "@/lib/site-data";
import { ExternalLink, Facebook, Heart, MessageCircle, ShieldCheck, Share2 } from "lucide-react";

const feed = [
  {
    date: "3 dni temu",
    text: "Chorwacja domknięta w jednym slipie: ostatnia załoga wchodziła do Rogoznicy przy 22 węzłach i ani jedna ręka nie zadrżała. Jestem z Was dumna. ⛵",
  },
  {
    date: "2 tygodnie temu",
    text: "Nowy termin na Cyklady już w kalendarzu. Kto pyta o lipiec — tak, to ten rejs z kotwiczeniem w zatoce, o której nikomu nie mówimy.",
  },
  {
    date: "1 miesiąc temu",
    text: "Szkolenie z manewrów portowych zaliczone. Osiem kobiet, osiem podejść do kei, zero nerwów i jedna wielka kolacja na pokładzie.",
  },
];

export function WhatIDo() {
  const { content } = useSiteData();

  return (
    <section id="co-robie" className="surface-deep py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow">Co robię</span>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Warunki pływania z Kapitanką
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-navy-foreground/75">
            {content.rulesIntro}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Accordion type="single" collapsible className="w-full">
              {content.rules.map((rule, i) => (
                <AccordionItem
                  key={rule.title}
                  value={`rule-${i}`}
                  className="border-navy-foreground/15"
                >
                  <AccordionTrigger className="text-left text-base hover:no-underline">
                    <span className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                      {rule.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 text-sm leading-relaxed text-navy-foreground/75">
                    {rule.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-2xl">Co słychać na pokładzie?</h3>
            <p className="mt-2 text-sm text-navy-foreground/70">
              Relacje na żywo z rejsów prosto z Facebooka.
            </p>

            <Card className="mt-6 overflow-hidden border-navy-foreground/10 bg-card p-0 text-card-foreground">
              <div className="flex items-center gap-3 border-b border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy">
                  <Facebook className="h-5 w-5 text-navy-foreground" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Pożegluj sobie ze mną</p>
                  <p className="text-xs text-muted-foreground">4,2 tys. obserwujących</p>
                </div>
              </div>

              <div className="divide-y divide-border">
                {feed.map((post) => (
                  <article key={post.date} className="p-4">
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{post.text}</p>
                    <div className="mt-3 flex gap-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Heart className="h-3.5 w-3.5" /> 128
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5" /> 14
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Share2 className="h-3.5 w-3.5" /> 6
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="p-4">
                <Button asChild variant="navy" className="w-full">
                  <a href={content.contact.facebook} target="_blank" rel="noreferrer">
                    <Facebook className="h-4 w-4" />
                    Obserwuj na Facebooku
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
