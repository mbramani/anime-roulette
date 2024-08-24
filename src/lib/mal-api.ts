import { Anime } from './types';

const MAL_API_BASE_URL = 'https://api.myanimelist.net/v2';

interface Paging {
  next?: string;
}

interface AnimeListResponse {
  data: Anime[];
  paging: Paging;
}

export async function fetchAnimeList(username: string): Promise<Anime[]> {
  let allAnime: Anime[] = [];
  let nextUrl: string | null = `${MAL_API_BASE_URL}/users/${username}/animelist?limit=1000&fields=list_status,num_episodes,media_type,status&nsfw=true`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: {
          'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID!,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch anime list: ${response.status} ${response.statusText}`);
      }

      const data: AnimeListResponse = await response.json();
      allAnime = [...allAnime, ...data.data];

      // Determine if there is a next page and update nextUrl
      nextUrl = data.paging?.next ?? null;

      // If the next URL's offset is 0, terminate the loop
      if (nextUrl && new URL(nextUrl).searchParams.get('offset') === '0') {
        nextUrl = null;
      }
    }
  } catch (error) {
    console.error('Error fetching anime list:', error);
    throw error;
  }

  return allAnime;
}
