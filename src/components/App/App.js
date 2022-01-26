import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Search from '../Search/Search.component';
import Table from '../Table/Table.component';
import { ButtonWithLoading } from '../../utils/withLoading';
import { DEFAULT_QUERY, getHackerNewsUrl } from '../../constants/constants';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sorting
  const [sortKey, setSortKey] = useState('NONE');
  const [isSortReverse, setIsSortReverse] = useState(false);

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

  const onSort = (sortKeyArg) => {
    const isSortReversed = sortKey === sortKeyArg && !isSortReverse;
    setSortKey(sortKeyArg);
    setIsSortReverse(!isSortReversed);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onDelete = (id) => {
    const { hits, page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatehits = hits.filter(isNotId);

    const updateResult = {
      ...results,
      [searchKey]: { hits: updatehits, page },
    };

    setResults(updateResult);
  };

  const applyUpdateResult = (result) => (prevState) => ({
    [searchKey]: {
      ...prevState.hits,
      hits: result.hits,
      page: result.page,
    },
  });

  const applySetResult = (result) => (prevState) => ({
    [searchKey]: {
      hits: result.hits,
      page: result.page,
    },
  });

  const needToSearchTopStories = (searchTerm) => !results[searchTerm];

  const setSearchTopStories = (result) => {
    const { hits, page } = result;

    page === 0
      ? setResults(applySetResult(result))
      : setResults(applyUpdateResult(result));
  };

  const onSearchSubmit = (event) => {
    setSearchKey(searchTerm);

    if (needToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  const onPaginatedSearch = (e) => {
    fetchSearchTopStories(searchTerm, page + 1);
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    const PATH_URL = getHackerNewsUrl(searchTerm, page);
    axios(`${PATH_URL}`)
      .then((result) => {
        setIsLoading(true);
        setSearchTopStories(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.error(error);
      });
  };

  useEffect(() => {
    setSearchKey(searchTerm);
    fetchSearchTopStories(searchTerm, page);
  }, [searchTerm, page]);

  return (
    <div className='page'>
      <div className='interactions'>
        <Search
          value={searchTerm}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        >
          Search
        </Search>
      </div>

      {error ? (
        <div className='interactions'>
          <p>Something went wrong.</p>
        </div>
      ) : (
        results && (
          <Table
            list={list}
            sortKey={sortKey}
            isSortReverse={isSortReverse}
            onSort={onSort}
            onDelete={onDelete}
          />
        )
      )}

      <div className='interactions'>
        {page !== null && !error && (
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => onPaginatedSearch(searchTerm, page + 1)}
          >
            Click to See More
          </ButtonWithLoading>
        )}
      </div>
    </div>
  );
};

export default App;
