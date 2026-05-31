export default function DailyQuestionSection() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="glass rounded-[40px] p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            daily question
          </p>

          <h2 className="mt-6 text-4xl font-bold">
            what moment made you smile recently?
          </h2>

          <textarea
            placeholder="your answer..."
            className="mt-8 h-40 w-full resize-none rounded-3xl border border-white/10 bg-white/5 p-6 outline-none"
          />

          <button className="mt-6 rounded-2xl bg-[var(--accent)] px-6 py-4 font-semibold text-black">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}