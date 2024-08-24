import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeRoulette",
  description: "Track and discover anime from your MAL list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " dark:bg-gray-900 bg-white duration-500 transition-all ease-in-out"
        }
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
