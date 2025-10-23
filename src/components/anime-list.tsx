import { Anime } from "@/lib/types";
import LazyImage from "./lazy-image";
import Link from "next/link";

interface AnimeListProps {
  animeList: Anime[];
  isRandom: boolean;
}

const statusColors = {
  watching: "bg-blue-500",
  completed: "bg-green-500",
  on_hold: "bg-yellow-500",
  dropped: "bg-red-500",
  plan_to_watch: "bg-orange-500",
};

const statusLabels = {
  watching: "Watching",
  completed: "Completed",
  on_hold: "On Hold",
  dropped: "Dropped",
  plan_to_watch: "Plan to Watch",
};

export default function AnimeList({ animeList, isRandom }: AnimeListProps) {
  // Check if the anime list is empty
  if (animeList.length === 0) {
    return (
      <div className="text-center p-12 bg-gradient-to-br from-orange-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
        <div className="text-6xl mb-4">🎬</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          No anime found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Try adjusting your filters or adding some anime to your list
        </p>
      </div>
    );
  }

  return (
    <div>
      {isRandom && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🎲 Your Random Anime Selection
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Believe it! Discover something new from your list!
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeList.map((anime, index) => {
          const progressPercentage =
            anime.node.num_episodes > 0
              ? (anime.list_status.num_episodes_watched / anime.node.num_episodes) * 100
              : 0;

          return (
            <Link
              href={`https://myanimelist.net/anime/${anime.node.id}`}
              title={anime.node.title}
              key={anime.node.id}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-orange-500/30 border border-gray-300/60 dark:border-gray-700 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
              aria-label={`View details about ${anime.node.title}`}
            >
              <div className="relative overflow-hidden">
                <LazyImage
                  src={anime.node.main_picture.large || anime.node.main_picture.medium}
                  alt={anime.node.title}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
                      statusColors[anime.list_status.status]
                    } shadow-lg backdrop-blur-sm`}
                  >
                    {statusLabels[anime.list_status.status]}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  {anime.node.mean && (
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-yellow-400 flex items-center">
                      <span className="mr-1">⭐</span>
                      {anime.node.mean.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between items-center text-white text-sm mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="font-bold">
                        {anime.list_status.num_episodes_watched}/{anime.node.num_episodes || "?"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
                  {anime.node.title}
                </h3>

                {/* Quick Info Row */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  {anime.node.rank && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="mr-1">🏆</span>
                      <span className="font-semibold">#{anime.node.rank.toLocaleString()}</span>
                    </div>
                  )}
                  {anime.node.start_season && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="mr-1">📅</span>
                      <span>{anime.node.start_season.season.charAt(0).toUpperCase() + anime.node.start_season.season.slice(1)} {anime.node.start_season.year}</span>
                    </div>
                  )}
                </div>

                {/* Studio */}
                {anime.node.studios && anime.node.studios.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="mr-2">🎬</span>
                    <span className="font-medium truncate">{anime.node.studios[0].name}</span>
                  </div>
                )}

                {/* Genres */}
                {anime.node.genres && anime.node.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {anime.node.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-full border border-orange-200 dark:border-orange-800"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* User Score */}
                {anime.list_status.score !== undefined && anime.list_status.score > 0 ? (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="mr-2">💯</span>
                    <span className="font-medium">Your Score: {anime.list_status.score}/10</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-3">
                    <span className="mr-2">📝</span>
                    <span className="font-medium">Not Rated</span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                    {anime.node.media_type.toUpperCase()}
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                    {anime.node.num_episodes || "?"} eps
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
