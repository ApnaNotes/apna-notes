"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import {
  Pizza04Icon,
  CommandFreeIcons,
  GlobalSearchIcon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const FEATURES = [
  {
    id: "notes-library",
    label: "Notes Library",
    icon: DashboardSquare01Icon,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200",
    description:
      "Curated notes, PYQs, and quick revision sheets for UPSC, JEE, NEET, and Boards.",
  },
  {
    id: "study-material",
    label: "Study Material",
    icon: MagicWandIcon,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200",
    description:
      "Well-structured chapter-wise study resources to help you prepare with clarity and consistency.",
  },
  {
    id: "pyq",
    label: "PYQ",
    icon: Pizza04Icon,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200",
    description:
      "Practice with previous year questions to understand exam pattern, difficulty, and smart solving strategy.",
  },
  {
    id: "senior-connect",
    label: "Senior Connect",
    icon: CommandFreeIcons,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    description:
      "Connect with verified seniors through 1:1 calls for direct guidance on strategy, resources, and common mistakes.",
  },
  {
    id: "first-5-min",
    label: "First 5 Min Free",
    icon: GlobalSearchIcon,
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
    description:
      "Start your session risk-free. Use the first 5 free minutes to evaluate mentor fit.",
  },
  {
    id: "verified-mentors",
    label: "Verified Mentors",
    icon: CheckmarkCircle01Icon,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
    description:
      "Each profile clearly shows exam background, rank, and student feedback for trust.",
  },
];

const ITEM_HEIGHT = 58;
const SCROLL_STEP_COOLDOWN = 420;

export function FeatureCarousel() {
  const lenis = useLenis();
  const [step, setStep] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lastStepAtRef = useRef(0);
  const lastIndex = FEATURES.length - 1;

  const currentIndex = Math.max(0, Math.min(step, lastIndex));

  const handleChipClick = (index: number) => {
    setStep(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const syncLayoutMode = () => setIsMobileView(mediaQuery.matches);
    syncLayoutMode();
    mediaQuery.addEventListener("change", syncLayoutMode);
    return () => mediaQuery.removeEventListener("change", syncLayoutMode);
  }, []);

  const isSectionPinned = () => {
    if (!sectionRef.current) return false;
    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= window.innerHeight * 0.9;
  };

  const canStepNow = () => {
    const now = Date.now();
    if (now - lastStepAtRef.current < SCROLL_STEP_COOLDOWN) return false;
    lastStepAtRef.current = now;
    return true;
  };

  const skipPastStickyBoundary = (direction: "up" | "down") => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();

    if (direction === "down") {
      const remaining = rect.bottom - window.innerHeight;
      if (remaining > 0) {
        const targetY = window.scrollY + remaining + 2;
        if (lenis) {
          lenis.scrollTo(targetY, { immediate: true });
        } else {
          window.scrollBy({ top: remaining + 2, behavior: "auto" });
        }
      }
      return;
    }

    const overshootTop = -rect.top;
    if (overshootTop > 0) {
      const targetY = Math.max(0, window.scrollY - (overshootTop + 2));
      if (lenis) {
        lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollBy({ top: -(overshootTop + 2), behavior: "auto" });
      }
    }
  };

  useEffect(() => {
    if (isMobileView) return;

    const onWheel = (event: WheelEvent) => {
      if (!isSectionPinned()) return;

      // At last feature, scrolling down exits carousel
      if (event.deltaY > 0 && currentIndex >= lastIndex) {
        skipPastStickyBoundary("down");
        return; // Allow natural page scroll
      }

      // At first feature, scrolling up exits carousel
      if (event.deltaY < 0 && currentIndex <= 0) {
        skipPastStickyBoundary("up");
        return; // Allow natural page scroll
      }

      // Normal carousel scroll
      if (event.deltaY > 0 && currentIndex < lastIndex) {
        event.preventDefault();
        if (canStepNow()) setStep((prev) => Math.min(lastIndex, prev + 1));
        return;
      }

      if (event.deltaY < 0 && currentIndex > 0) {
        event.preventDefault();
        if (canStepNow()) setStep((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [currentIndex, isMobileView, lastIndex, lenis]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (isMobileView) return;
    if (!isSectionPinned()) return;
    if (touchStartYRef.current === null) return;

    const currentY = event.touches[0]?.clientY;
    if (typeof currentY !== "number") return;

    const deltaY = touchStartYRef.current - currentY;
    if (Math.abs(deltaY) < 24) return;

    // At last feature, touch scroll down exits carousel
    if (deltaY > 0 && currentIndex >= lastIndex) {
      skipPastStickyBoundary("down");
      return; // Allow natural page scroll
    }

    // At first feature, touch scroll up exits carousel
    if (deltaY < 0 && currentIndex <= 0) {
      skipPastStickyBoundary("up");
      return; // Allow natural page scroll
    }

    // Normal carousel scroll
    if (deltaY > 0 && currentIndex < lastIndex) {
      event.preventDefault();
      if (canStepNow()) setStep((prev) => Math.min(lastIndex, prev + 1));
      touchStartYRef.current = currentY;
      return;
    }

    if (deltaY < 0 && currentIndex > 0) {
      event.preventDefault();
      if (canStepNow()) setStep((prev) => Math.max(0, prev - 1));
      touchStartYRef.current = currentY;
    }
  };

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return "active";
    if (diff === -1) return "prev";
    if (diff === 1) return "next";
    return "hidden";
  };

  if (isMobileView) {
    const activeFeature = FEATURES[currentIndex];

    return (
      <section
        id="features"
        className="relative bg-gradient-to-b from-background via-background to-muted/20 px-4 py-14"
      >
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              ApnaNotes Features
            </p>
            <h3 className="mt-2 bg-gradient-to-r from-foreground via-foreground to-sky-300 bg-clip-text text-2xl font-semibold text-transparent">
              Explore Features
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tap any feature to preview details.
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={feature.id}
                  onClick={() => handleChipClick(index)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-2 text-left text-xs transition-all",
                    isActive
                      ? "border-foreground/20 bg-foreground text-background"
                      : "border-border bg-background/50 text-foreground/85"
                  )}
                >
                  <HugeiconsIcon icon={feature.icon} size={14} strokeWidth={2} />
                  <span className="truncate">{feature.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={activeFeature.image}
                alt={activeFeature.label}
                fill
                sizes="100vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 pt-20">
                <div className="mb-2 w-fit rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] tracking-[0.12em] text-white">
                  {currentIndex + 1} • {activeFeature.label}
                </div>
                <p className="text-base leading-relaxed text-white">
                  {activeFeature.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="features"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative h-[320vh] bg-gradient-to-b from-background via-background to-muted/20"
    >
      <div className="sticky top-0 flex h-screen items-center px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative flex min-h-[620px] flex-col overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/80 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm lg:aspect-video lg:flex-row lg:rounded-[4rem]">
            <div className="relative z-30 flex min-h-[360px] w-full flex-col items-start justify-start overflow-hidden bg-gradient-to-b from-card via-card/95 to-background px-8 pt-14 md:min-h-[460px] md:px-14 md:pt-20 lg:h-full lg:w-[40%] lg:pl-16 lg:pt-16">
              <div className="absolute inset-x-0 top-0 z-40 h-14 bg-gradient-to-b from-card via-card/80 to-transparent md:h-20 lg:h-16" />
              <div className="absolute inset-x-0 bottom-0 z-40 h-14 bg-gradient-to-t from-background via-background/80 to-transparent md:h-20 lg:h-16" />

              <div className="relative z-20 mb-6 mt-4 max-w-sm md:mt-6">
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  ApnaNotes Features
                </p>
                <h3 className="mt-2 bg-gradient-to-r from-foreground via-foreground to-sky-300 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
                  Scroll to Explore
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Scroll to preview the core features quickly.
                </p>
              </div>

              <div className="relative z-20 mt-12 flex h-[280px] w-full items-start justify-start overflow-hidden lg:mt-12 lg:h-[320px]">
                {FEATURES.map((feature, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;

                  return (
                    <motion.div
                      key={feature.id}
                      style={{
                        height: ITEM_HEIGHT,
                        width: "fit-content",
                      }}
                      animate={{
                        y: distance * ITEM_HEIGHT,
                        opacity: Math.max(0, 1 - Math.abs(distance) * 0.22),
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 22,
                        mass: 1,
                      }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        onClick={() => handleChipClick(index)}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-full border px-5 py-3 text-left transition-all duration-500 md:px-7 md:py-3.5 lg:px-6 lg:py-3",
                          isActive
                            ? "z-10 border-foreground/20 bg-foreground text-background"
                            : "border-border bg-background/40 text-foreground/85 hover:border-foreground/30 hover:bg-background/70 hover:text-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center transition-colors duration-300",
                            isActive ? "text-background" : "text-muted-foreground"
                          )}
                        >
                          <HugeiconsIcon
                            icon={feature.icon}
                            size={18}
                            strokeWidth={2}
                          />
                        </div>

                        <span className="whitespace-nowrap text-sm font-medium tracking-tight md:text-[14px]">
                          {feature.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-h-[520px] flex-1 items-center justify-center overflow-hidden border-t border-border/40 bg-gradient-to-br from-background via-card/60 to-background px-6 py-16 md:min-h-[620px] md:px-12 md:py-24 lg:h-full lg:border-t-0 lg:border-l lg:px-10 lg:py-16">
              <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
                {FEATURES.map((feature, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === "active";
                  const isPrev = status === "prev";
                  const isNext = status === "next";

                  return (
                    <motion.div
                      key={feature.id}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                        opacity: isActive ? 1 : isPrev || isNext ? 0.42 : 0,
                        rotate: isPrev ? -3 : isNext ? 3 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 24,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 origin-center overflow-hidden rounded-[2rem] border-4 border-border/70 bg-background md:rounded-[2.8rem] md:border-8"
                    >
                      <Image
                        src={feature.image}
                        alt={feature.label}
                        fill
                        sizes="(max-width: 768px) 80vw, 420px"
                        className={cn(
                          "h-full w-full object-cover transition-all duration-700",
                          isActive
                            ? "grayscale-0 blur-0"
                            : "grayscale blur-[2px] brightness-75"
                        )}
                      />

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                          >
                            <div className="mb-3 w-fit rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[11px] font-normal tracking-[0.12em] text-white shadow-lg backdrop-blur-sm">
                              {index + 1} • {feature.label}
                            </div>
                            <p className="text-xl leading-tight font-normal tracking-tight text-white drop-shadow-md md:text-2xl">
                              {feature.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div
                        className={cn(
                          "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      >
                        <div className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_12px_rgb(125,211,252)]" />
                        <span className="font-mono text-[10px] font-normal tracking-[0.3em] uppercase text-white/85">
                          Feature Spotlight
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureCarousel;
