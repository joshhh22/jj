"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-6 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass flex items-center justify-between rounded-[28px] px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-bold text-black">
              ♡
            </div>

            <h1 className="gradient-text text-3xl font-bold">
              Our Story
            </h1>
          </div>

          <div className="flex items-center gap-8 text-sm text-zinc-300">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}