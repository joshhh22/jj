"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

type Memory = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

export default function MemoriesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [memories, setMemories] = useState<
    Memory[]
  >([]);

  async function fetchMemories(): Promise<void> {
    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setMemories(data as Memory[]);
    }
  }

  useEffect(() => {
    fetchMemories();
  }, []);

  async function uploadMemory() {
    if (!image) return;

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("memories")
        .upload(fileName, image);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("memories")
      .getPublicUrl(fileName);

    const { error } = await supabase
      .from("memories")
      .insert({
        title,
        description,
        image_url: publicUrl,
      });

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    setDescription("");
    setImage(null);

    await fetchMemories();
  }

  return (
    <main className="min-h-screen px-6 pb-20 pt-40">
      <div className="mx-auto max-w-7xl">
        <h1 className="gradient-text text-6xl font-bold">
          Memories
        </h1>

        {/* FORM */}
        <div className="glass mt-12 rounded-[40px] p-8">
          <input
            type="text"
            placeholder="memory title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="mb-4 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <textarea
            placeholder="description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="h-40 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
            className="mt-4"
          />

          <button
            onClick={uploadMemory}
            className="mt-6 rounded-2xl bg-[var(--primary)] px-6 py-4 font-semibold text-black"
          >
            Upload Memory
          </button>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="glass overflow-hidden rounded-[32px]"
            >
              <img
                src={memory.image_url}
                alt={memory.title}
                className="h-[320px] w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-3xl font-bold">
                  {memory.title}
                </h2>

                <p className="mt-3 text-zinc-400">
                  {memory.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}