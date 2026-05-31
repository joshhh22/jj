"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-badge", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
    });

    gsap.from(".hero-title", {
      opacity: 0,
      y: 120,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.6,
    });

    gsap.from(".hero-scroll", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1,
    });
  });

  return (
    <section
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-[#081018]" />

      <div className="absolute left-[-300px] top-[10%] h-[700px] w-[700px] rounded-full bg-blue-400/20 blur-3xl" />

      <div className="absolute right-[-300px] bottom-[0%] h-[700px] w-[700px] rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="hero-badge glass mb-10 rounded-full px-6 py-3 text-sm text-zinc-300">
          ✦ our little universe
        </div>

        <h1 className="hero-title gradient-text max-w-6xl font-bold leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem]">
          Joshua & Her
        </h1>

        <div className="hero-subtitle mt-8 flex items-center gap-4 text-zinc-300">
          <span className="text-[var(--primary)]">✦</span>

          <p className="text-sm sm:text-lg">
            still choosing each other everyday
          </p>

          <span className="text-[var(--accent)]">✦</span>
        </div>

        <div className="hero-scroll mt-20 flex flex-col items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl backdrop-blur-xl">
            ↓
          </div>

          <p className="text-xs tracking-[0.4em] text-zinc-500">
            SCROLL DOWN
          </p>
        </div>
      </div>
    </section>
  );
}