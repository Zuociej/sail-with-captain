import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Trip } from "@/lib/site-data";

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(100),
  email: z.string().trim().email("Niepoprawny adres e-mail").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Podaj numer telefonu")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Niepoprawny numer telefonu"),
  message: z.string().trim().max(1000).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function JoinTripDialog({
  trip,
  open,
  onOpenChange,
  onConfirmed,
}: {
  trip: Trip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmed: (trip: Trip) => void;
}) {
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!trip) return;
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    onConfirmed(trip);
    onOpenChange(false);
    toast.success("Zgłoszenie wysłane!", {
      description: `Rezerwujemy miejsce na rejs „${trip.title}". Kapitanka odezwie się w ciągu 24 godzin.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Dołącz do rejsu</DialogTitle>
          <DialogDescription>
            {trip ? `${trip.title} · ${trip.dates} · ${trip.duration}` : ""}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trip">Wybrany rejs</Label>
            <Input id="trip" name="trip" readOnly value={trip?.title ?? ""} className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input id="name" name="name" maxLength={100} placeholder="Anna Kowalska" />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" maxLength={255} placeholder="anna@example.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" maxLength={20} placeholder="+48 600 100 200" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Wiadomość (opcjonalnie)</Label>
            <Textarea
              id="message"
              name="message"
              maxLength={1000}
              rows={3}
              placeholder="Twoje doświadczenie żeglarskie, pytania, preferencje…"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button type="submit" variant="navy">
              Wyślij zgłoszenie
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
