import type { Metadata } from "next";
import { Work_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-heading",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swiss Trip",
  description: "Switzerland itinerary, 16-19 Oct 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
