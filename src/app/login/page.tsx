"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function signIn() {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    alert("Check your email.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <h1 className="gradient-text text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-3 text-zinc-400">
          private space for us
        </p>

        <input
          type="email"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
        />

        <button
          onClick={signIn}
          className="mt-5 w-full rounded-xl bg-[var(--primary)] p-4 font-semibold text-black transition hover:scale-[1.02]"
        >
          Continue
        </button>
      </div>
    </main>
  );
}