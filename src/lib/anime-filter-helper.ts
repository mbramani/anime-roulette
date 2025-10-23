import {
  Anime,
  AnimeStatus,
  AnimeType,
  EpisodesWatchedFilter,
  SortOrder,
} from "@/lib/types";

export function filterAnimeList(
  animeList: Anime[],
  animeType: AnimeType,
  animeStatus: AnimeStatus,
  episodesWatched: EpisodesWatchedFilter,
  showNSFW: boolean = true,
): Anime[] {
  let filtered = [...animeList];

  if (animeType !== "all") {
    filtered = filtered.filter((anime) => anime.node.media_type === animeType);
  }

  if (animeStatus !== "all") {
    filtered = filtered.filter(
      (anime) => anime.list_status.status === animeStatus,
    );
  }

  if (episodesWatched !== "all") {
    filtered = filtered.filter((anime) => {
      const watchedRatio =
        anime.list_status.num_episodes_watched / anime.node.num_episodes;
      switch (episodesWatched) {
        case "not-started":
          return watchedRatio === 0;
        case "in-progress":
          return watchedRatio > 0 && watchedRatio < 1;
        case "completed":
          return watchedRatio === 1;
        default:
          return true;
      }
    });
  }

  if (!showNSFW) {
    filtered = filtered.filter((anime) => anime.node.rating !== "Rx");
  }

  return filtered;
}

export function sortAnimeList(
  animeList: Anime[],
  sortOrder: SortOrder,
): Anime[] {
  return [...animeList].sort((a, b) => {
    const diff = a.node.num_episodes - b.node.num_episodes;
    return sortOrder === "asc" ? diff : -diff;
  });
}

export function getRandomAnime(
  animeList: Anime[],
  animeType: AnimeType,
  animeStatus: AnimeStatus,
  episodesWatched: EpisodesWatchedFilter,
  count: number,
  showNSFW: boolean = true,
): Anime[] {
  const filteredAnime = filterAnimeList(
    animeList,
    animeType,
    animeStatus,
    episodesWatched,
    showNSFW,
  );

  if (filteredAnime.length === 0) {
    return [];
  }

  const randomCount = Math.min(count, filteredAnime.length);
  const randomAnime: Anime[] = [];
  const tempList = [...filteredAnime];

  for (let i = 0; i < randomCount; i++) {
    const randomIndex = Math.floor(Math.random() * tempList.length);
    randomAnime.push(tempList[randomIndex]);
    tempList.splice(randomIndex, 1);
  }

  return randomAnime;
}
