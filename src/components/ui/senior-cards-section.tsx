// Senior Connect Platform
// Section: Senior Card
// Mobile-first, Tailwind CSS, Next.js

import { BadgeCheck, Star } from "lucide-react";

type SeniorCardProps = {
  name: string;
  exam: string;
  rank: string;
  rating: number;
  pricePerMin: string;
  verified?: boolean;
};

const seniors: SeniorCardProps[] = [
  {
    name: "Aarav Sharma",
    exam: "UPSC CSE",
    rank: "AIR 62",
    rating: 4.9,
    pricePerMin: "Rs 6/min",
    verified: true,
  },
  {
    name: "Riya Verma",
    exam: "NEET",
    rank: "Score 695",
    rating: 4.8,
    pricePerMin: "Rs 5/min",
    verified: true,
  },
  {
    name: "Kunal Gupta",
    exam: "JEE Advanced",
    rank: "AIR 411",
    rating: 4.7,
    pricePerMin: "Rs 4/min",
    verified: true,
  },
];

function SeniorCard({
  name,
  exam,
  rank,
  rating,
  pricePerMin,
  verified,
}: SeniorCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-muted-foreground text-sm">{exam}</p>
        </div>
        {verified ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified
          </span>
        ) : null}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-white/10 p-3">
          <p className="text-white/60">Result</p>
          <p className="font-medium">{rank}</p>
        </div>
        <div className="rounded-lg border border-white/10 p-3">
          <p className="text-white/60">Rating</p>
          <p className="inline-flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-current" /> {rating}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium">{pricePerMin}</p>
    </article>
  );
}

export function SeniorCardsSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Meet Verified Seniors
        </h2>
        <p className="text-muted-foreground mt-3 text-center text-sm md:text-base">
          Chat with toppers who have already cracked your target exam.
        </p>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {seniors.map((senior) => (
            <SeniorCard key={senior.name} {...senior} />
          ))}
        </div>
      </div>
    </section>
  );
}
