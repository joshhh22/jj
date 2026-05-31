"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type Note = {
  id: string;
  content: string;
  created_at: string;
};

export default function NotesPage() {
  const [note, setNote] = useState("");

  const [notes, setNotes] = useState<
    Note[]
  >([]);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("shared_notes")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setNotes(data as Note[]);
    }
  }

  useEffect(() => {
    fetchNotes();

    const channel = supabase
      .channel("shared-notes")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shared_notes",
        },
        () => {
          fetchNotes();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function saveNote() {
    if (!note.trim()) return;

    const { error } = await supabase
      .from("shared_notes")
      .insert({
        content: note,
      });

    if (error) {
      console.error(error);
      return;
    }

    setNote("");
  }

  async function deleteNote(id: string) {
    await supabase
      .from("shared_notes")
      .delete()
      .eq("id", id);
  }

  return (
    <main className="min-h-screen px-6 pb-20 pt-40">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            realtime collaborative space
          </p>

          <h1 className="gradient-text mt-4 text-6xl font-bold">
            Shared Notes
          </h1>
        </div>

        {/* INPUT */}
        <div className="glass mt-12 rounded-[40px] p-8">
          <textarea
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            placeholder="write something..."
            className="h-40 w-full resize-none bg-transparent outline-none"
          />

          <button
            onClick={saveNote}
            className="mt-6 rounded-2xl bg-[var(--primary)] px-6 py-4 font-semibold text-black"
          >
            Save Note
          </button>
        </div>

        {/* NOTES */}
        <div className="mt-12 space-y-6">
          {notes.map((item) => (
            <div
              key={item.id}
              className="glass rounded-[32px] p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-lg leading-relaxed text-zinc-200">
                    {item.content}
                  </p>

                  <p className="mt-4 text-sm text-zinc-500">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteNote(item.id)
                  }
                  className="text-sm text-red-400 transition hover:text-red-300"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}