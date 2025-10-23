// components/HomeContent.tsx

"use client";

import { useCallback, useEffect, useState } from "react";

import { Anime } from "@/lib/types";
import AnimeList from "@/components/anime-list";
import FilterSort from "@/components/filter-sort";
import { getAnimeList } from "@/app/actions";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function HomeContent() {
  const [username, setUsername] = useLocalStorage<string>("mal-username", "mbramani");
  const [animeList, setAnimeList] = useLocalStorage<Anime[]>("anime-list", []);
  const [filteredList, setFilteredList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (animeList.length > 0) {
      setFilteredList(animeList);
    }
  }, [animeList]);

  const fetchAnime = useCallback(
    async (user: string) => {
      setLoading(true);
      setError(null);
      try {
        const list = await getAnimeList(user);
        setAnimeList(list);
        setFilteredList(list);
      } catch (error) {
        console.error("Error fetching anime list:", error);
        setError("Failed to fetch anime list. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [setAnimeList]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAnime(username);
  };

  return (
    <main>
      {/* Username Input Form */}
      <div className="max-w-md mx-auto mb-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter MAL username"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              aria-label="MAL username"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-1"
            aria-label="Fetch Anime List"
          >
            {loading ? (
              <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>📥</span>
            )}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-md mx-auto mb-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-300"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-4">
          <img
            src="/anime-loading.gif"
            alt="Loading animation"
            className="w-64 h-64"
          />
        </div>
      ) : (
        <>
          {animeList.length > 0 && (
            <div className="mb-4">
              <FilterSort
                animeList={animeList}
                setFilteredList={setFilteredList}
                setIsRandom={setIsRandom}
              />
            </div>
          )}
          <AnimeList animeList={filteredList} isRandom={isRandom} />
        </>
      )}
    </main>
  );
}
