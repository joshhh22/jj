"use client";

import { useEffect, useState } from "react";

export default function AnniversarySection() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const startDate = new Date("2026-03-29T00:00:00");

    function calculateDays() {
      const now = new Date();

      const diff =
        now.getTime() - startDate.getTime();

      const totalDays = Math.floor(
        diff / (1000 * 60 * 60 * 24)
      );

      setDays(totalDays);
    }

    calculateDays();
  }, []);

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="glass rounded-[40px] p-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            together for
          </p>

          <h2 className="gradient-text mt-6 text-7xl font-bold">
            {days} Days
          </h2>

          <p className="mt-6 text-zinc-400">
            still choosing each other everyday
          </p>
        </div>
      </div>
    </section>
  );
}