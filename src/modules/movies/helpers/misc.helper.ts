export function getTmdbMoviePath(tmdbId: number): string {
  return `movie/${tmdbId}`
}

export function getTmdbVideoPath(tmdbId: number): string {
  return `movie/${tmdbId}/videos`
}

export interface Genre {
  id: number;
  name: string;
}

export interface VideoMeta {
  key: string;
  site: string;
  type: string;
  official: boolean;
}