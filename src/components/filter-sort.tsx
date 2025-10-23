"use client";

import {
  Anime,
  AnimeStatus,
  AnimeType,
  EpisodesWatchedFilter,
  SortOrder,
} from "@/lib/types";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  filterAnimeList,
  getRandomAnime,
  sortAnimeList,
} from "@/lib/anime-filter-helper";

import { useState } from "react";

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
  const [episodesWatched, setEpisodesWatched] = useState<EpisodesWatchedFilter>("all");
  const [randomCount, setRandomCount] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(10);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(true);
  const [showNSFW, setShowNSFW] = useState<boolean>(false);

  // Get unique genres from anime list
  const allGenres = Array.from(
    new Set(
      animeList
        .flatMap((anime) => anime.node.genres?.map((g) => g.name) || [])
        .filter(Boolean)
    )
  ).sort();

  const handleFilter = () => {
    let filtered = filterAnimeList(
      animeList,
      animeType,
      animeStatus,
      episodesWatched,
      showNSFW
    );

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((anime) =>
        anime.node.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply score filter
    filtered = filtered.filter((anime) => {
      const score = anime.list_status.score || 0;
      return score >= minScore && score <= maxScore;
    });

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((anime) =>
        selectedGenres.some((genre) =>
          anime.node.genres?.some((g) => g.name === genre)
        )
      );
    }

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
      randomCount,
      showNSFW,
    );
    setFilteredList(randomAnime);
    setIsRandom(true);
  };

  const clearFilters = () => {
    setSortOrder("asc");
    setAnimeType("all");
    setAnimeStatus("all");
    setEpisodesWatched("all");
    setSearchQuery("");
    setMinScore(0);
    setMaxScore(10);
    setSelectedGenres([]);
    setShowNSFW(false);
    setFilteredList(animeList);
    setIsRandom(false);
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>

      {/* Main container */}
      <div className="relative bg-white/98 dark:bg-gray-800/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-700/50">
        {/* Header */}
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Anime Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🎬</span>
          </div>
          <select
            value={animeType}
            onChange={(e) => setAnimeType(e.target.value as AnimeType)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none"
          >
            <option value="all">All Types</option>
            <option value="tv">📺 TV Series</option>
            <option value="movie">🎥 Movie</option>
            <option value="ova">💿 OVA</option>
            <option value="ona">🌐 ONA</option>
            <option value="special">✨ Special</option>
          </select>
        </div>

        {/* Status */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">📊</span>
          </div>
          <select
            value={animeStatus}
            onChange={(e) => setAnimeStatus(e.target.value as AnimeStatus)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="watching">👀 Watching</option>
            <option value="completed">✅ Completed</option>
            <option value="on_hold">⏸️ On Hold</option>
            <option value="dropped">❌ Dropped</option>
            <option value="plan_to_watch">📋 Plan to Watch</option>
          </select>
        </div>

        {/* Progress */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">📈</span>
          </div>
          <select
            value={episodesWatched}
            onChange={(e) => setEpisodesWatched(e.target.value as EpisodesWatchedFilter)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none"
          >
            <option value="all">All Progress</option>
            <option value="not-started">🚀 Not Started</option>
            <option value="in-progress">⚡ In Progress</option>
            <option value="completed">🏁 Completed</option>
          </select>
        </div>
      </div>

      {/* NSFW Toggle */}
      <div className="mb-6 flex justify-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showNSFW}
            onChange={(e) => setShowNSFW(e.target.checked)}
            className="sr-only"
          />
          <div className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
            showNSFW ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
              showNSFW ? 'translate-x-4' : 'translate-x-0'
            }`}></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            🔞 Show NSFW Content
          </span>
        </label>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-800/30 dark:hover:to-red-800/30 border border-orange-200 dark:border-orange-700 rounded-xl transition-all duration-200 group"
        >
          <ChevronDownIcon
            className={`w-5 h-5 text-orange-600 dark:text-orange-400 mr-2 transition-transform duration-200 ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`}
          />
          <span className="text-orange-700 dark:text-orange-300 font-medium">
            {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Filters
          </span>
        </button>
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="mb-6 p-6 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl border border-orange-200/50 dark:border-orange-700/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Score Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ⭐ Your Score Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={maxScore}
                  onChange={(e) => setMaxScore(Number(e.target.value))}
                  className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔄 Sort By
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="asc">📈 Episodes: Low to High</option>
                <option value="desc">📉 Episodes: High to Low</option>
              </select>
            </div>

            {/* Random Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🎲 Random Count
              </label>
              <input
                type="number"
                value={randomCount}
                onChange={(e) =>
                  setRandomCount(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Genres */}
          {allGenres.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                🎭 Genres ({allGenres.length} total, {selectedGenres.length} selected)
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 focus:outline-none ${
                      selectedGenres.includes(genre)
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:border-orange-400"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🔍 Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            🗑️ Clear
          </button>
        </div>
        <button
          onClick={handleRandomSelect}
          className="flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          🎲 Pick Random ({randomCount})
        </button>
      </div>
      </div>
    </div>
  );
}
