"use client";

import { Howl } from "howler";
import { useEffect } from "react";

export default function MusicPlayer() {
  useEffect(() => {
    const sound = new Howl({
      src: ["/music/ambient.mp3"],
      loop: true,
      volume: 0.2,
      autoplay: true,
    });

    sound.play();

    return () => {
      sound.stop();
    };
  }, []);

  return null;
}