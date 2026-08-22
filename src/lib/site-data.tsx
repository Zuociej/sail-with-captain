import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import greece from "@/assets/greece.jpg";
import croatia from "@/assets/croatia.jpg";
import mazury from "@/assets/mazury.jpg";

export type Trip = {
  id: string;
  title: string;
  region: string;
  image: string;
  dates: string;
  duration: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
  description: string;
};

export type Rule = { title: string; body: string };

export type SiteContent = {
  about: {
    heading: string;
    body: string;
  };
  rulesIntro: string;
  rules: Rule[];
  contact: {
    body: string;
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
  };
  trips: Trip[];
};

const defaultContent: SiteContent = {
  about: {
    heading: "Kim jestem",
    body: `Jestem kapitanką jachtową z ponad piętnastoletnim stażem na wodach Bałtyku, Adriatyku i Morza Egejskiego. Przepłynęłam ponad 30 000 mil morskich, ale najbardziej dumna jestem z kobiet, które zeszły z mojego pokładu pewniejsze siebie niż weszły.

Babskie rejsy zaczęły się od jednego pytania: gdzie na jachcie jest miejsce, w którym kobieta nie musi nikomu nic udowadniać? Nie znalazłam takiego miejsca, więc je stworzyłam.

Na moim pokładzie każda z Was stanie za sterem, postawi żagiel i wejdzie do portu. Bez oceniania, bez pośpiechu, z pełnym wsparciem załogi i kapitanki.`,
  },
  rulesIntro:
    "Rejs to nie wycieczka — to wspólna praca, wspólna wachta i wspólna przygoda. Oto zasady, na których opiera się każdy mój rejs.",
  rules: [
    {
      title: "Doświadczenie nie jest wymagane",
      body: "Przyjmuję zarówno kompletne debiutantki, jak i żeglarki z patentem. Program dopasowuję do składu załogi — każda dostaje zadania na miarę swoich możliwości i o krok dalej.",
    },
    {
      title: "Bezpieczeństwo przede wszystkim",
      body: "Kamizelki asekuracyjne po zmroku i przy wietrze powyżej 5°B, szelki na pokładzie, odprawa bezpieczeństwa pierwszego dnia. Kapitanka podejmuje ostateczne decyzje dotyczące trasy i pogody.",
    },
    {
      title: "Załoga, nie pasażerki",
      body: "Dzielimy się wachtami, gotowaniem i sprzątaniem jachtu. Każdy dzień ma swój dyżur kambuzowy — to część zabawy i najlepszy sposób na zżycie się z załogą.",
    },
    {
      title: "Bagaż i lista rzeczy",
      body: "Miękka torba zamiast walizki, obuwie z jasną podeszwą, kurtka sztormowa, krem z filtrem, okulary z troczkiem i dobry humor. Pełną listę wysyłam mailem po zapisie.",
    },
    {
      title: "Zasada zero rywalizacji",
      body: "Nie ścigamy się i nie oceniamy. Manewr można powtórzyć tyle razy, ile trzeba — od tego jestem na pokładzie.",
    },
    {
      title: "Zaliczka i rezygnacja",
      body: "Rezerwację potwierdza zaliczka 30% ceny rejsu. Przy rezygnacji do 30 dni przed startem zaliczka jest zwracana w całości lub przenoszona na inny termin.",
    },
  ],
  contact: {
    body: "Masz pytanie o rejs, termin albo o to, czy dasz radę? Napisz albo zadzwoń — odpisuję zwykle tego samego dnia, chyba że akurat jestem na wodzie.",
    email: "kapitanka@pozeglujsobiezemna.pl",
    phone: "+48 600 100 200",
    facebook: "https://facebook.com/pozeglujsobiezemna",
    instagram: "https://instagram.com/pozeglujsobiezemna",
  },
  trips: [
    {
      id: "greece-2026",
      title: "Słoneczna Grecja",
      region: "Cyklady, Morze Egejskie",
      image: greece,
      dates: "12.07 – 19.07.2026",
      duration: "7 dni",
      price: 3200,
      spotsLeft: 3,
      totalSpots: 8,
      description:
        "Meltemi, białe miasteczka i kotwiczenie w zatokach, do których nie dopłyną promy.",
    },
    {
      id: "croatia-2026",
      title: "Magiczna Chorwacja",
      region: "Dalmacja, Adriatyk",
      image: croatia,
      dates: "23.08 – 30.08.2026",
      duration: "7 dni",
      price: 3600,
      spotsLeft: 1,
      totalSpots: 8,
      description:
        "Szybkie żeglowanie między wyspami, kamienne porty i kolacje w konobach o zachodzie słońca.",
    },
    {
      id: "mazury-2026",
      title: "Mazury na rozgrzewkę",
      region: "Wielkie Jeziora Mazurskie",
      image: mazury,
      dates: "15.05 – 18.05.2026",
      duration: "4 dni",
      price: 1250,
      spotsLeft: 0,
      totalSpots: 6,
      description:
        "Weekendowy rejs szkoleniowy — idealny pierwszy krok przed morskim sezonem.",
    },
  ],
};

const STORAGE_KEY = "psz-site-content-v1";

type SiteDataContextValue = {
  content: SiteContent;
  updateContent: (next: SiteContent) => void;
  reset: () => void;
  decrementSpot: (tripId: string) => void;
};

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SiteContent;
        setContent({
          ...defaultContent,
          ...parsed,
          trips: parsed.trips?.length
            ? parsed.trips.map((t) => ({
                ...t,
                image:
                  defaultContent.trips.find((d) => d.id === t.id)?.image ?? t.image,
              }))
            : defaultContent.trips,
        });
      }
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const persist = useCallback((next: SiteContent) => {
    setContent(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<SiteDataContextValue>(
    () => ({
      content,
      updateContent: persist,
      reset: () => persist(defaultContent),
      decrementSpot: (tripId: string) =>
        persist({
          ...content,
          trips: content.trips.map((t) =>
            t.id === tripId ? { ...t, spotsLeft: Math.max(0, t.spotsLeft - 1) } : t,
          ),
        }),
    }),
    [content, persist],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
