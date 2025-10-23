"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

import { useEffect } from "react";
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
    <header className="relative mb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-10 dark:opacity-20 rounded-3xl"></div>

      {/* Content */}
      <div className="relative flex justify-between items-center p-6 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-gray-700/50">
        {/* Logo/Title Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">🌀</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Anime Roulette
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
              Believe it! Discover your next favorite anime
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            onClick={toggleDarkMode}
            className="group relative p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
          >
            <div className="relative w-6 h-6">
              <SunIcon className={`absolute inset-0 h-6 w-6 text-yellow-500 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <MoonIcon className={`absolute inset-0 h-6 w-6 text-orange-400 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Decorative elements */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </header>
  );
}
