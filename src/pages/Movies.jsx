import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search/Search';
import MovieResults from '../components/MovieResults/MovieResults';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from the URL
  const searchTerm = searchParams.get('search') || '';
  const yearFilter = searchParams.get('year') || '1950';

  // Define the functions that will modify the URL state
  const handleSearch = (newSearchTerm) => {
    if (newSearchTerm.trim()) {
      setSearchParams({ search: newSearchTerm, year: yearFilter });
    } else {
      setSearchParams({});
    }
  };

  const handleYearChange = (newYear) => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm, year: newYear });
    }
  };

  const handleReset = () => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm, year: '1950' });
    }
  };

  return (
    <>
      {/* 
        THIS IS THE CRITICAL PART.
        You MUST pass the functions and values to the Search component here.
      */}
      <Search
        initialSearchTerm={searchTerm}
        initialYearFilter={yearFilter}
        onSearch={handleSearch}
        onYearChange={handleYearChange}
        onReset={handleReset}
      />

      <MovieResults
        searchTerm={searchTerm}
        yearFilter={yearFilter}
      />
    </>
  );
};

export default Movies;