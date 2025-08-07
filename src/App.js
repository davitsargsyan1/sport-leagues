import { useState, useEffect, useMemo, useCallback } from 'react';
import Masonry from 'react-masonry-css';

import { useDebounce } from './hooks';
import { fetchAllLeagues } from './utils/api';
import LeagueCard from './components/LeagueCard';
import SearchFilter from './components/SearchFilter';

function App() {
  const [error, setError] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        setLoading(true);
        const leaguesData = await fetchAllLeagues();
        setLeagues(leaguesData);
      } catch (err) {
        setError('Failed to load leagues. Please try again later.');
        console.error('Error loading leagues:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLeagues();
  }, []);

  const handleSearchTermChange = useCallback(value => {
    setSearchTerm(value);
  }, []);

  const handleSportChange = useCallback(value => {
    setSelectedSport(value);
  }, []);

  const sports = useMemo(() => {
    const uniqueSports = [...new Set(leagues.map(league => league.strSport))];
    return uniqueSports.sort();
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch =
        league.strLeague.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

      const matchesSport = !selectedSport || league.strSport === selectedSport;

      return matchesSearch && matchesSport;
    });
  }, [leagues, debouncedSearchTerm, selectedSport]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading sports leagues...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Sports Leagues</h1>
        <p>Click on any league to view its season badge</p>
      </div>

      <SearchFilter
        sports={sports}
        searchTerm={searchTerm}
        selectedSport={selectedSport}
        onSportChange={handleSportChange}
        onSearchTermChange={handleSearchTermChange}
      />

      <Masonry
        breakpointCols={{
          default: 3,
          1100: 3,
          700: 2,
          500: 1,
        }}
        className="leagues-masonry"
        columnClassName="leagues-masonry_column"
      >
        {filteredLeagues.map(league => (
          <LeagueCard key={league.idLeague} league={league} />
        ))}
      </Masonry>

      {!filteredLeagues.length && !loading && (
        <div className="loading">No leagues found matching your criteria.</div>
      )}
    </div>
  );
}

export default App;
