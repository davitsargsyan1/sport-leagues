import React, { memo } from 'react';
import { SearchFilterProps } from '../types';

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedSport,
  onSportChange,
  sports,
}) => (
  <div className="filters">
    <input
      id="search-input"
      type="text"
      placeholder="Search leagues by name..."
      value={searchTerm}
      onChange={e => onSearchTermChange(e.target.value)}
      className="search-input"
    />

    <select
      id="sport-select"
      value={selectedSport}
      onChange={e => onSportChange(e.target.value)}
      className="filter-select"
    >
      <option value="">All Sports</option>
      {sports.map(sport => (
        <option key={sport} value={sport}>
          {sport}
        </option>
      ))}
    </select>
  </div>
);

export default memo(SearchFilter);
