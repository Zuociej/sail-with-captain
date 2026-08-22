import { useState } from "react";

import { JoinTripDialog } from "@/components/site/JoinTripDialog";
import { TripCard } from "@/components/site/TripCard";
import { useSiteData, type Trip } from "@/lib/site-data";

export function Trips() {
  const { content, decrementSpot } = useSiteData();
  const [selected, setSelected] = useState<Trip | null>(null);
  const [open, setOpen] = useState(false);

  function handleJoin(trip: Trip) {
    setSelected(trip);
    setOpen(true);
  }

  return (
    <section id="rejsy" className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow">Babskie rejsy</span>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Terminy sezonu 2026</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Małe załogi, duże wrażenia. Każdy rejs to maksymalnie osiem kobiet, jedna
            kapitanka i tydzień, po którym patrzy się na mapę inaczej.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {content.trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onJoin={handleJoin} />
          ))}
        </div>
      </div>

      <JoinTripDialog
        trip={selected}
        open={open}
        onOpenChange={setOpen}
        onConfirmed={(trip) => decrementSpot(trip.id)}
      />
    </section>
  );
}
