"use client";

import { useEffect, useState } from "react";

type Star = {
  top: number;
  left: number;
  delay: number;
};

export default function StarsBackground() {
  const [stars, setStars] = useState<Array<Star>>([]);

  useEffect(() => {
  const generatedStars = [];

  for (let i = 0; i < 40; i++) {
    generatedStars.push({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    });
  }

  setStars(generatedStars as Star[]);
}, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-[2px] animate-pulse rounded-full bg-white opacity-70"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}