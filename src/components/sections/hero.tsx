"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const hero = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
    });
  }, []);

  return (
    <section
      ref={hero}
      className="flex min-h-screen items-center justify-center"
    >
      <h1 className="hero-title gradient-text text-8xl font-bold">
        Our Story
      </h1>
    </section>
  );
}