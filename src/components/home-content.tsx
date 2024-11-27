// components/HomeContent.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import AnimeList from "@/components/anime-list";
import FilterSort from "@/components/filter-sort";
import { getAnimeList } from "@/app/actions";
import { Anime } from "@/lib/types";
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
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex justify-center">
          <label htmlFor="username" className="sr-only">
            Enter MAL username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter MAL username"
            className="border p-2 rounded-l-md w-[72%] md:w-64 dark:bg-gray-800 dark:text-white"
            aria-label="MAL username"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white md:px-6 md:py-2 p-2 text-nowrap text-base rounded-r-md hover:bg-indigo-700 transition-colors duration-300"
            aria-label="Fetch Anime List"
          >
            Fetch Anime List
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 text-center mb-4" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <img
            src="/anime-loading.gif"
            alt="Loading animation"
            className="w-auto h-48 mb-4"
          />
          <p className="text-xl dark:text-white text-gray-800">Loading...</p>
        </div>
      ) : (
        <>
          {animeList.length > 0 && (
            <>
              <div className="text-center mb-4 dark:text-white text-gray-800">
                Total Anime: {animeList.length}
              </div>
              <FilterSort
                animeList={animeList}
                setFilteredList={setFilteredList}
                setIsRandom={setIsRandom}
              />
            </>
          )}
          <AnimeList animeList={filteredList} isRandom={isRandom} />
        </>
      )}
    </main>
  );
}
