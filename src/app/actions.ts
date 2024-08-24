"use server";

import { fetchAnimeList } from "@/lib/mal-api";
import { Anime } from "@/lib/types";

export async function getAnimeList(username: string): Promise<Anime[]> {
  try {
    return await fetchAnimeList(username);
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return [];
  }
}
