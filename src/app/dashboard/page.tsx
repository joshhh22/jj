import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-40">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            private dashboard
          </p>

          <h1 className="gradient-text mt-4 text-6xl font-bold">
            Our Space
          </h1>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/dashboard/memories"
            className="glass rounded-3xl p-8 transition hover:scale-[1.02]"
          >
            <h2 className="text-3xl font-bold">
              Memories
            </h2>

            <p className="mt-3 text-zinc-400">
              our favorite moments together
            </p>
          </Link>

          <Link
            href="/dashboard/notes"
            className="glass rounded-3xl p-8 transition hover:scale-[1.02]"
          >
            <h2 className="text-3xl font-bold">
              Shared Notes
            </h2>

            <p className="mt-3 text-zinc-400">
              thoughts, reminders, random things
            </p>
          </Link>

          <Link
            href="/dashboard/letters"
            className="glass rounded-3xl p-8 transition hover:scale-[1.02]"
          >
            <h2 className="text-3xl font-bold">
              Letters
            </h2>

            <p className="mt-3 text-zinc-400">
              messages for each other
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}