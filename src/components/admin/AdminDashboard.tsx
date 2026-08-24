import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { LogOut, RotateCcw, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/lib/admin-auth";
import { useSiteData, type SiteContent, type Trip } from "@/lib/site-data";

export function AdminDashboard() {
  const { content, updateContent, reset } = useSiteData();
  const { logout } = useAdminAuth();
  const [draft, setDraft] = useState<SiteContent>(content);

  function save() {
    updateContent(draft);
    toast.success("Zapisano zmiany");
  }

  function patchTrip(id: string, patch: Partial<Trip>) {
    setDraft({
      ...draft,
      trips: draft.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  }

  function addTrip() {
    const id = `rejs-${Date.now()}`;
    setDraft({
      ...draft,
      trips: [
        ...draft.trips,
        {
          id,
          title: "Nowy rejs",
          region: "",
          image: draft.trips[0]?.image ?? "",
          dates: "",
          duration: "7 dni",
          price: 0,
          spotsLeft: 8,
          totalSpots: 8,
          description: "",
        },
      ],
    });
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 lg:px-10">
          <h1 className="font-display text-xl">Panel kapitanki</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">Strona główna</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => { reset(); setDraft(content); toast.success("Przywrócono dane domyślne"); }}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
            <Button variant="navy" size="sm" onClick={logout}>
              <LogOut className="h-3.5 w-3.5" />
              Wyloguj
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-5 py-10 lg:px-10">
        <section className="space-y-4 rounded-sm border border-border bg-card p-6">
          <h2 className="font-display text-lg">Kim jestem</h2>
          <div className="space-y-2">
            <Label htmlFor="about-heading">Nagłówek</Label>
            <Input
              id="about-heading"
              value={draft.about.heading}
              onChange={(e) => setDraft({ ...draft, about: { ...draft.about, heading: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about-body">Treść</Label>
            <Textarea
              id="about-body"
              rows={8}
              value={draft.about.body}
              onChange={(e) => setDraft({ ...draft, about: { ...draft.about, body: e.target.value } })}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-sm border border-border bg-card p-6">
          <h2 className="font-display text-lg">Zasady rejsów</h2>
          <div className="space-y-2">
            <Label htmlFor="rules-intro">Wstęp</Label>
            <Textarea
              id="rules-intro"
              rows={3}
              value={draft.rulesIntro}
              onChange={(e) => setDraft({ ...draft, rulesIntro: e.target.value })}
            />
          </div>
          {draft.rules.map((rule, i) => (
            <div key={i} className="grid gap-3 border-t border-border pt-4 md:grid-cols-[1fr_2fr]">
              <Input
                value={rule.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    rules: draft.rules.map((r, j) => (i === j ? { ...r, title: e.target.value } : r)),
                  })
                }
              />
              <Textarea
                rows={3}
                value={rule.body}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    rules: draft.rules.map((r, j) => (i === j ? { ...r, body: e.target.value } : r)),
                  })
                }
              />
            </div>
          ))}
        </section>

        <section className="space-y-5 rounded-sm border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Rejsy</h2>
            <Button variant="outline" size="sm" onClick={addTrip}>
              <Plus className="h-3.5 w-3.5" />
              Dodaj rejs
            </Button>
          </div>
          {draft.trips.map((trip) => (
            <div key={trip.id} className="space-y-3 border-t border-border pt-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Input value={trip.title} onChange={(e) => patchTrip(trip.id, { title: e.target.value })} placeholder="Tytuł" />
                <Input value={trip.region} onChange={(e) => patchTrip(trip.id, { region: e.target.value })} placeholder="Region" />
                <Input value={trip.dates} onChange={(e) => patchTrip(trip.id, { dates: e.target.value })} placeholder="Terminy" />
                <Input value={trip.duration} onChange={(e) => patchTrip(trip.id, { duration: e.target.value })} placeholder="Czas trwania" />
                <Input
                  type="number"
                  value={trip.price}
                  onChange={(e) => patchTrip(trip.id, { price: Number(e.target.value) })}
                  placeholder="Cena"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={trip.spotsLeft}
                    onChange={(e) => patchTrip(trip.id, { spotsLeft: Number(e.target.value) })}
                    placeholder="Wolne miejsca"
                  />
                  <Input
                    type="number"
                    value={trip.totalSpots}
                    onChange={(e) => patchTrip(trip.id, { totalSpots: Number(e.target.value) })}
                    placeholder="Miejsca razem"
                  />
                </div>
              </div>
              <Textarea
                rows={2}
                value={trip.description}
                onChange={(e) => patchTrip(trip.id, { description: e.target.value })}
                placeholder="Opis"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDraft({ ...draft, trips: draft.trips.filter((t) => t.id !== trip.id) })}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Usuń rejs
              </Button>
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-sm border border-border bg-card p-6">
          <h2 className="font-display text-lg">Kontakt</h2>
          <Textarea
            rows={3}
            value={draft.contact.body}
            onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, body: e.target.value } })}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              value={draft.contact.email}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, email: e.target.value } })}
              placeholder="E-mail"
            />
            <Input
              value={draft.contact.phone}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, phone: e.target.value } })}
              placeholder="Telefon"
            />
            <Input
              value={draft.contact.facebook}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, facebook: e.target.value } })}
              placeholder="Facebook"
            />
            <Input
              value={draft.contact.instagram}
              onChange={(e) => setDraft({ ...draft, contact: { ...draft.contact, instagram: e.target.value } })}
              placeholder="Instagram"
            />
          </div>
        </section>

        <div className="sticky bottom-4 flex justify-end">
          <Button variant="navy" size="lg" onClick={save}>
            Zapisz zmiany
          </Button>
        </div>
      </main>
    </div>
  );
}
