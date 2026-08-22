import { Anchor } from "lucide-react";

export function Footer() {
  return (
    <footer className="surface-deep border-t border-navy-foreground/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-navy-foreground/70 sm:flex-row lg:px-10">
        <span className="flex items-center gap-2">
          <Anchor className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <span className="font-display text-base text-navy-foreground">
            Pożegluj sobie ze mną
          </span>
        </span>
        <span>© {new Date().getFullYear()} · Babskie rejsy morskie</span>
      </div>
    </footer>
  );
}
