// Senior Connect Platform
// Section: Feature Split
// Mobile-first, Tailwind CSS, Next.js

import { BookOpenText, Filter, ShieldCheck, Users } from "lucide-react";

const notePoints = [
  "Exam > Subject > Topic structure",
  "Board/Class/Exam filters",
  "Preview free, full unlock after login",
];

const connectPoints = [
  "Verified toppers with rank/score",
  "1-on-1 chat/call support",
  "First 5 minutes FREE for new users",
];

export function FeatureSplitSection() {
  return (
    <section id="features" className="px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Notes + Senior Connect on one platform
          </h2>
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            Study smarter with structured material and real mentor guidance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpenText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Notes & Study Materials</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Curated notes for UPSC, JEE, NEET, and Boards by verified seniors.
            </p>
            <ul className="space-y-2 text-sm">
              {notePoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Filter className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Senior Connect</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Clear doubts with verified toppers via chat or call.
            </p>
            <ul className="space-y-2 text-sm">
              {connectPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
