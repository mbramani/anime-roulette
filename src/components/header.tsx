"use client";

import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Header() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("dark-mode", false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-indigo-800 dark:text-indigo-400">
        AnimeRoulette
      </h1>
      <button
        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onClick={toggleDarkMode}
        className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-800" />
        )}
      </button>
    </header>
  );
}
