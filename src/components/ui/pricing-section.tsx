// Senior Connect Platform
// Section: Pricing
// Mobile-first, Tailwind CSS, Next.js

import { BentoPricing } from "@/components/ui/bento-pricing";

export function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Recharge Plans
        </h2>
        <p className="text-muted-foreground mt-3 text-center text-sm md:text-base">
          Every new user gets the first 5 minutes free. The session timer is always visible,
          and the session auto-pauses with a recharge prompt when balance runs out.
        </p>

        <div className="mt-8 md:mt-12">
          <BentoPricing />
        </div>
      </div>
    </section>
  );
}
