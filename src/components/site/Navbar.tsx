import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Anchor, Lock, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#kim-jestem", label: "Kim jestem" },
  { href: "#co-robie", label: "Co robię" },
  { href: "#rejsy", label: "Babskie rejsy" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a
          href="#top"
          className={cn(
            "flex items-center gap-2.5 transition-colors",
            scrolled ? "text-foreground" : "text-navy-foreground",
          )}
        >
          <Anchor className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-display text-lg leading-tight tracking-wide sm:text-xl">
            Pożegluj sobie ze mną
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-gold",
                scrolled ? "text-foreground/80" : "text-navy-foreground/85",
              )}
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant={scrolled ? "outline" : "ghostLight"} size="sm">
            <Link to="/admin">
              <Lock className="h-3.5 w-3.5" />
              Login
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={cn(
            "lg:hidden",
            scrolled ? "text-foreground" : "text-navy-foreground",
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-foreground/85 hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="outline" size="sm" className="mt-2 w-full">
              <Link to="/admin" onClick={() => setOpen(false)}>
                <Lock className="h-3.5 w-3.5" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
