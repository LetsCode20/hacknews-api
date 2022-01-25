import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '../Button/Button.component';
import Search from '../Search/Search.component';
import Table from '../Table/Table.component';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants/constants';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [results, setResults] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [error, setError] = useState(null);

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

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

  const needToSearchTopStories = (searchTerm) => !results[searchTerm];

  const setSearchTopStories = (result) => {
    const { hits, page } = result;

    const oldHits = results && results[searchKey] ? result[searchKey].hits : [];
    const updatehits = [...oldHits, ...hits];

    setResults({ ...results, [searchKey]: { hits: updatehits, page } });
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((result) => setSearchTopStories(result.data))
      .catch((error) => setError(error));
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    setSearchKey(searchTerm);

    if (needToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm);
    }
  };

  useEffect(() => {
    fetchSearchTopStories(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

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
        results && <Table list={list} onDelete={onDelete} />
      )}
      <div className='interactions'>
        <Button onClick={() => fetchSearchTopStories(searchTerm, page + 1)}>
          Click to See More
        </Button>
      </div>
    </div>
  );
};

export default App;
