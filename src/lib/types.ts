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
    mean?: number;
    rank?: number;
    popularity?: number;
    num_list_users?: number;
    start_date?: string;
    end_date?: string;
    start_season?: {
      year: number;
      season: string;
    };
    source?: string;
    rating?: string;
    studios?: Array<{
      id: number;
      name: string;
    }>;
    genres?: Array<{
      id: number;
      name: string;
    }>;
    synopsis?: string;
  };
  list_status: {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    num_episodes_watched: number;
    score?: number;
    updated_at?: string;
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
