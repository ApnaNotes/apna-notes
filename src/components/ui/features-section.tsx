"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DiscoverSeniorsCard() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.14 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <motion.span
        className="text-4xl font-semibold text-foreground md:text-6xl"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Find
      </motion.span>
    </div>
  );
}

function BookCallCard() {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const layouts = [
    "grid-cols-2 grid-rows-2",
    "grid-cols-3 grid-rows-1",
    "grid-cols-1 grid-rows-3",
  ];

  return (
    <div className="flex h-full items-center justify-center p-4">
      <motion.div className={`grid w-full max-w-[140px] gap-2 ${layouts[layout]}`} layout>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="min-h-[30px] rounded-md bg-primary/20"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function StartSessionCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="text-3xl font-medium text-foreground md:text-4xl">5 min free</span>
      <span className="text-sm text-muted-foreground">Start Session</span>
      <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="mb-3 text-sm tracking-widest text-muted-foreground uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How Senior Connect Works
        </motion.p>
        <motion.h2
          className="mb-8 text-3xl font-semibold text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Discover, book, and learn in minutes
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            className="flex min-h-[280px] flex-col rounded-xl bg-secondary p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            data-clickable
          >
            <div className="flex-1">
              <DiscoverSeniorsCard />
            </div>
            <div className="mt-4">
              <h3 className="text-xl text-foreground">1. Discover Seniors</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Find verified seniors based on exam, budget, and language preference.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-[280px] flex-col rounded-xl bg-secondary p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <BookCallCard />
            </div>
            <div className="mt-4">
              <h3 className="text-xl text-foreground">2. Book a Call</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Review profiles, choose a slot, and book an instant or scheduled call.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-[280px] flex-col rounded-xl bg-secondary p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <StartSessionCard />
            </div>
            <div className="mt-4">
              <h3 className="text-xl text-foreground">3. Start Learning</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start with the first 5 minutes free, continue with a visible timer,
                and get an instant recharge prompt if your balance runs out.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
