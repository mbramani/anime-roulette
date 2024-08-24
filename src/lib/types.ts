export interface Anime {
  node: {
    id: number;
    title: string;
    main_picture: {
      medium: string;
      large: string;
    };
    num_episodes: number;
    media_type: string;
  };
  list_status: {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    num_episodes_watched: number;
  };
}
export type SortOrder = "asc" | "desc";
export type AnimeType = "all" | "tv" | "movie" | "ova" | "special" | "ona";
export type AnimeStatus =
  | "all"
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch";
export type EpisodesWatchedFilter =
  | "all"
  | "not-started"
  | "in-progress"
  | "completed";
