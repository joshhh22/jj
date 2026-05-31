"use client";

import {
  PhotoProvider,
  PhotoView,
} from "react-photo-view";

const images = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
];

export default function GallerySection() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="gradient-text text-5xl font-bold">
          Gallery
        </h2>

        <PhotoProvider>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {images.map((src, index) => (
              <PhotoView key={index} src={src}>
                <img
                  src={src}
                  className="h-[400px] w-full cursor-pointer rounded-3xl object-cover transition hover:scale-[1.02]"
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
}