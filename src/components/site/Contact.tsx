import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteData } from "@/lib/site-data";

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię").max(100),
  email: z.string().trim().email("Niepoprawny adres e-mail").max(255),
  message: z.string().trim().min(5, "Napisz kilka słów").max(1000),
});

export function Contact() {
  const { content } = useSiteData();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    form.reset();
    toast.success("Wiadomość wysłana!", {
      description: "Kapitanka odpisze zwykle tego samego dnia.",
    });
  }

  return (
    <section id="kontakt" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <span className="eyebrow">Kontakt</span>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Zamustruj się na pokład</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{content.contact.body}</p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-4 rounded-sm border border-border bg-card p-4 transition-colors hover:border-gold"
            >
              <Mail className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  E-mail
                </span>
                <span className="text-sm">{content.contact.email}</span>
              </span>
            </a>
            <a
              href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-sm border border-border bg-card p-4 transition-colors hover:border-gold"
            >
              <Phone className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Telefon
                </span>
                <span className="text-sm">{content.contact.phone}</span>
              </span>
            </a>
          </div>

          <div className="mt-6 flex gap-3">
            <Button asChild variant="outline" size="icon" aria-label="Facebook">
              <a href={content.contact.facebook} target="_blank" rel="noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" aria-label="Instagram">
              <a href={content.contact.instagram} target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-sm border border-border bg-card p-7 shadow-[var(--shadow-soft)] lg:p-9"
        >
          <div className="space-y-2">
            <Label htmlFor="c-name">Imię</Label>
            <Input id="c-name" name="name" maxLength={100} placeholder="Anna" />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">E-mail</Label>
            <Input id="c-email" name="email" type="email" maxLength={255} placeholder="anna@example.com" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-message">Wiadomość</Label>
            <Textarea id="c-message" name="message" rows={6} maxLength={1000} placeholder="W czym mogę pomóc?" />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>
          <Button type="submit" variant="navy" className="w-full">
            Wyślij wiadomość
          </Button>
        </form>
      </div>
    </section>
  );
}
