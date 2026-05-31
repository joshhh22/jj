import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/layout/navbar";
import SmoothScroll from "@/components/motion/smooth-scroll";
import Loader from "@/components/layout/loader";
import StarsBackground from "@/components/layout/stars";
import MusicPlayer from "@/components/layout/music-player";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Private cinematic couple website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Loader />
        <StarsBackground />
        <MusicPlayer />
        <SmoothScroll />
        <Navbar />

        {children}
      </body>
    </html>
  );
}