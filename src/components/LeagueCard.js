import { useState, useCallback, useMemo, memo } from 'react';

import { getSportStyle } from '../helpers';
import { fetchSeasonBadge } from '../utils/api';

const LeagueCard = ({ league }) => {
  const [badgeUrl, setBadgeUrl] = useState(null);
  const [badgeLoaded, setBadgeLoaded] = useState(false);
  const [badgeLoading, setBadgeLoading] = useState(false);

  const handleCardClick = useCallback(async () => {
    if (badgeLoading) return;

    if (badgeUrl || badgeLoaded) {
      setBadgeUrl(null);
      setBadgeLoaded(false);
      setBadgeLoading(false);
      return;
    }

    setBadgeLoading(true);
    try {
      const badge = await fetchSeasonBadge(league.idLeague);
      setBadgeUrl(badge);
      setBadgeLoaded(true);
    } catch (error) {
      console.error('Error loading badge:', error);
      setBadgeLoaded(true);
    } finally {
      setBadgeLoading(false);
    }
  }, [badgeLoading, badgeUrl, badgeLoaded, league.idLeague]);

  const sportStyle = useMemo(() => getSportStyle(league.strSport), [league.strSport]);

  return (
    <div className="league-card" onClick={handleCardClick}>
      <h3>{league.strLeague}</h3>

      {league.strLeagueAlternate && league.strLeagueAlternate !== league.strLeague && (
        <p>
          <strong>Also known as:</strong> {league.strLeagueAlternate}
        </p>
      )}

      <span className="sport-tag" style={{ backgroundColor: sportStyle?.color }}>
        <span className="sport-icon">{sportStyle?.icon}</span>
        {league.strSport}
      </span>

      {badgeLoading && <div className="badge-loading">Loading badge...</div>}

      {badgeUrl && (
        <img
          src={badgeUrl}
          className="badge-image"
          alt={`${league.strLeague} badge`}
          onError={e => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
};

export default memo(LeagueCard);
