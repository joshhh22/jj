const memories = [
  {
    title: "First Meet",
    date: "2025",
    desc: "where everything started",
  },
  {
    title: "First Call",
    date: "2025",
    desc: "hours felt like minutes",
  },
  {
    title: "First Date",
    date: "2025",
    desc: "nervous but perfect",
  },
];

export default function TimelineSection() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="gradient-text text-5xl font-bold">
          Our Timeline
        </h2>

        <div className="mt-20 space-y-10">
          {memories.map((memory, index) => (
            <div
              key={index}
              className="glass rounded-3xl p-8"
            >
              <p className="text-sm text-zinc-400">
                {memory.date}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {memory.title}
              </h3>

              <p className="mt-3 text-zinc-300">
                {memory.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}