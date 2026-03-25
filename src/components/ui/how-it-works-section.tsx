// Senior Connect Platform
// Section: How It Works
// Mobile-first, Tailwind CSS, Next.js

import { MessageCircle, PhoneCall, Wallet } from "lucide-react";

const steps = [
  {
    title: "Choose Senior",
    description: "Select your mentor by reviewing exam background, rank, and rating.",
    icon: MessageCircle,
  },
  {
    title: "Start 1-on-1 Session",
    description: "Start your chat or call. The first 5 minutes are free for new users.",
    icon: PhoneCall,
  },
  {
    title: "Recharge & Continue",
    description: "Recharge when your balance is low and continue your session.",
    icon: Wallet,
  },
];

export function HowItWorksSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          How Senior Connect Works
        </h2>
        <p className="text-muted-foreground mt-3 text-center text-sm md:text-base">
          3 simple steps, zero confusion.
        </p>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <step.icon className="h-5 w-5" />
                <span className="text-xs text-white/60">Step {index + 1}</span>
              </div>
              <h3 className="text-base font-semibold md:text-lg">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
