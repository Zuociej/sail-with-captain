import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Trip } from "@/lib/site-data";

export function TripCard({ trip, onJoin }: { trip: Trip; onJoin: (trip: Trip) => void }) {
  const soldOut = trip.spotsLeft <= 0;
  const spotsLabel = soldOut
    ? "Brak miejsc"
    : trip.spotsLeft === 1
      ? "Ostatnie miejsce!"
      : `Wolne miejsca: ${trip.spotsLeft}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/70 p-0 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/70 to-transparent" />
        <Badge
          variant={soldOut ? "secondary" : trip.spotsLeft === 1 ? "destructive" : "default"}
          className="absolute right-3 top-3"
        >
          <Users className="mr-1 h-3 w-3" />
          {spotsLabel}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {trip.region}
        </p>
        <h3 className="mt-2 text-2xl">{trip.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{trip.description}</p>

        <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-foreground/80">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {trip.dates}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {trip.duration}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 pt-1">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Cena</p>
            <p className="font-display text-3xl leading-none">
              {trip.price.toLocaleString("pl-PL")}{" "}
              <span className="text-base text-muted-foreground">PLN</span>
            </p>
          </div>
          <Button
            variant={soldOut ? "secondary" : "navy"}
            disabled={soldOut}
            onClick={() => onJoin(trip)}
          >
            {soldOut ? "Sold Out" : "Dołącz"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
