import cache from './cache';
import { League, LeaguesApiResponse, SeasonsApiResponse } from '../types';

const LEAGUES_API = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
const BADGE_API = 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=';

export const fetchAllLeagues = async (): Promise<League[]> => {
  const cacheKey = 'all_leagues';

  const cachedData = cache.get<League[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(LEAGUES_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LeaguesApiResponse = await response.json();
    const leagues = data.leagues || [];

    const filteredLeagues = leagues.filter(league => league.strLeague !== '_No League');

    console.log('leagues', leagues);

    cache.set(cacheKey, filteredLeagues);

    return filteredLeagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

export const fetchSeasonBadge = async (leagueId: string): Promise<string> => {
  const cacheKey = `badge_${leagueId}`;

  const cachedData = cache.get<string>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${BADGE_API}${leagueId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SeasonsApiResponse = await response.json();
    const seasons = data.seasons || [];

    const badgeUrl: string =
      seasons.length > 0 ? seasons.find(season => season.strBadge)?.strBadge || '/404-not-found.png' : '/404-not-found.png';

    cache.set(cacheKey, badgeUrl);

    return badgeUrl;
  } catch (error) {
    console.error('Error fetching badge:', error);
    throw error;
  }
};
