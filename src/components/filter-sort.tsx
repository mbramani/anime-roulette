"use client";

import { useState } from "react";
import {
  Anime,
  SortOrder,
  AnimeType,
  AnimeStatus,
  EpisodesWatchedFilter,
} from "@/lib/types";
import {
  filterAnimeList,
  sortAnimeList,
  getRandomAnime,
} from "@/lib/anime-filter-helper";

interface FilterSortProps {
  animeList: Anime[];
  setFilteredList: (list: Anime[]) => void;
  setIsRandom: (isRandom: boolean) => void;
}

export default function FilterSort({
  animeList,
  setFilteredList,
  setIsRandom,
}: FilterSortProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [animeType, setAnimeType] = useState<AnimeType>("all");
  const [animeStatus, setAnimeStatus] = useState<AnimeStatus>("all");
  const [episodesWatched, setEpisodesWatched] =
    useState<EpisodesWatchedFilter>("all");
  const [randomCount, setRandomCount] = useState<number>(3);

  const handleFilter = () => {
    const filtered = filterAnimeList(
      animeList,
      animeType,
      animeStatus,
      episodesWatched
    );
    const sorted = sortAnimeList(filtered, sortOrder);
    setFilteredList(sorted);
    setIsRandom(false);
  };

  const handleRandomSelect = () => {
    const randomAnime = getRandomAnime(
      animeList,
      animeType,
      animeStatus,
      episodesWatched,
      randomCount
    );
    setFilteredList(randomAnime);
    setIsRandom(true);
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <select
          value={animeType}
          onChange={(e) => setAnimeType(e.target.value as AnimeType)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          aria-label="Filter by anime type"
        >
          <option value="all">All Types</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="ona">ONA</option>
          <option value="special">Special</option>
        </select>
        <select
          value={animeStatus}
          onChange={(e) => setAnimeStatus(e.target.value as AnimeStatus)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          aria-label="Filter by anime status"
        >
          <option value="all">All Statuses</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
          <option value="dropped">Dropped</option>
          <option value="plan_to_watch">Plan to Watch</option>
        </select>
        <select
          value={episodesWatched}
          onChange={(e) =>
            setEpisodesWatched(e.target.value as EpisodesWatchedFilter)
          }
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          aria-label="Filter by episodes watched"
        >
          <option value="all">All Progress</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          aria-label="Sort by episode count"
        >
          <option value="asc">Episodes: Low to High</option>
          <option value="desc">Episodes: High to Low</option>
        </select>
        <input
          type="number"
          value={randomCount}
          onChange={(e) =>
            setRandomCount(Math.max(1, parseInt(e.target.value)))
          }
          min="1"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          placeholder="Random count"
          aria-label="Set number of random anime"
        />
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={handleFilter}
          className="bg-indigo-600 dark:bg-indigo-500 text-white md:px-6 md:py-2 p-2 text-base rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
          aria-label="Apply filters"
        >
          Apply Filters
        </button>
        <button
          onClick={handleRandomSelect}
          className="bg-purple-600 dark:bg-purple-500 text-white md:px-6 md:py-2 p-2 text-base rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
          aria-label="Pick random anime"
        >
          Pick Random Anime
        </button>
      </div>
    </div>
  );
}
