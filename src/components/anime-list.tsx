import { Anime } from "@/lib/types";
import Link from "next/link";
import LazyImage from "./lazy-image";

interface AnimeListProps {
  animeList: Anime[];
  isRandom: boolean;
}

export default function AnimeList({ animeList, isRandom }: AnimeListProps) {
  // Check if the anime list is empty
  if (animeList.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          No anime found.
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or adding some anime to your list.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isRandom && (
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
          Here are your randomly selected anime:
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animeList.map((anime) => (
          <Link
            href={`https://myanimelist.net/anime/${anime.node.id}`}
            title={anime.node.title}
            key={anime.node.id}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            aria-label={`View details about ${anime.node.title}`}
          >
            <LazyImage
              src={anime.node.main_picture.medium}
              alt={anime.node.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                {anime.node.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Episodes: {anime.node.num_episodes}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Watched: {anime.list_status.num_episodes_watched}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type: {anime.node.media_type}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status: {anime.list_status.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
