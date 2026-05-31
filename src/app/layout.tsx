import "./globals.css";
import type { Metadata } from "next";
import SmoothScroll from "@/components/motion/smooth-scroll";
import FadeUp from "@/components/motion/fade-up";

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
      <body>
        <SmoothScroll />

        <FadeUp>
          <h1 className="gradient-text text-7xl font-bold">
            Joshua & Her
          </h1>
        </FadeUp>

        {children}
      </body>
    </html>
  );
}