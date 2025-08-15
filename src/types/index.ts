export interface League {
  idLeague: string;
  strLeague: string;
  strLeagueAlternate?: string;
  strSport: string;
}

export interface LeaguesApiResponse {
  leagues: League[];
}

export interface Season {
  strBadge?: string;
  idSeason: string;
}

export interface SeasonsApiResponse {
  seasons: Season[] | null;
}

export interface LeagueCardProps {
  league: League;
}

export interface SearchFilterProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  sports: string[];
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export interface Cache {
  set<T>(key: string, data: T): void;
  get<T>(key: string): T | null;
  clear(): void;
}

export interface SportStyle {
  color: string;
  icon: string;
}

export type SportStyleMap = Record<string, SportStyle>;
