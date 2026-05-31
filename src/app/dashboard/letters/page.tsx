"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "@/lib/supabase/browser";
import { createPortal } from "react-dom";

type Letter = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function LettersPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [letters, setLetters] = useState<
    Letter[]
  >([]);

  const [selectedLetter, setSelectedLetter] =
    useState<Letter | null>(null);

  async function fetchLetters(): Promise<void> {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setLetters(data as Letter[]);
    }
  }

  useEffect(() => {
    fetchLetters();

    const channel = supabase
      .channel("letters-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "letters",
        },
        () => {
          fetchLetters();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function saveLetter() {
    if (!title.trim()) return;
    if (!content.trim()) return;

    const { error } = await supabase
      .from("letters")
      .insert({
        title,
        content,
      });

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    setContent("");
  }

  async function deleteLetter(id: string) {
    const { error } = await supabase
      .from("letters")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-40">
      {/* CONTENT */}
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            private emotional archive
          </p>

          <h1 className="gradient-text mt-4 text-6xl font-bold">
            Letters
          </h1>
        </div>

        {/* FORM */}
        <div className="glass mt-12 rounded-[40px] p-8">
          <input
            type="text"
            placeholder="letter title..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="mb-4 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <textarea
            placeholder="write your heart here..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="h-64 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-6 outline-none"
          />

          <button
            onClick={saveLetter}
            className="mt-6 rounded-2xl bg-[var(--accent)] px-6 py-4 font-semibold text-black"
          >
            Save Letter
          </button>
        </div>

        {/* LETTER GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {letters.map((letter) => (
            <motion.div
              key={letter.id}
              whileHover={{
                y: -5,
              }}
              onClick={() =>
                setSelectedLetter(letter)
              }
              className="glass cursor-pointer rounded-[32px] p-8"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                letter
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {letter.title}
              </h2>

              <p className="mt-6 line-clamp-3 text-zinc-400">
                {letter.content}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-zinc-500">
                  {new Date(
                    letter.created_at
                  ).toLocaleDateString()}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteLetter(letter.id);
                  }}
                  className="text-sm text-red-400"
                >
                  delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
{typeof window !== "undefined" &&
  createPortal(
    <AnimatePresence>
      {selectedLetter && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-xl"
          onClick={() =>
            setSelectedLetter(null)
          }
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="glass relative w-full max-w-3xl rounded-[40px] border border-white/10 p-10"
          >
            {/* CLOSE */}
            <button
              onClick={() =>
                setSelectedLetter(null)
              }
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400"
            >
              ✕
            </button>

            <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
              private letter
            </p>

            <h1 className="gradient-text mt-6 text-6xl font-bold leading-tight">
              {selectedLetter.title}
            </h1>

            <div className="mt-10 h-px bg-white/10" />

            <p className="mt-10 whitespace-pre-wrap text-xl leading-[2] text-zinc-200">
              {selectedLetter.content}
            </p>

            <p className="mt-12 text-sm text-zinc-500">
              {new Date(
                selectedLetter.created_at
              ).toLocaleString()}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )}
      </div>
  );
}