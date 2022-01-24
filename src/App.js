import React, { useEffect, useState } from 'react';
import Button from './components/Button.component';
import Search from './components/Search.component';
import Table from './components/Table.component';

const App = () => {
  const DEFAULT_QUERY = 'redux';
  const DEFAULT_HPP = '100';

  const PATH_BASE = 'https://hn.algolia.com/api/v1';
  const PATH_SEARCH = '/search';
  const PARAM_SEARCH = 'query=';
  const PARAM_PAGE = 'page=';
  const PARAM_HPP = 'hitsPerPage=';
  const DEFAULT_HPP = '';

  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState(null);
  let page = 0;
  // const PATH_URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

  const setSearchTopStories = (result) => {
    const { hits, page } = result;

    const oldHits = page !== 0 ? result.hits : [];
    const updatehits = [...oldHits, ...hits];

    setResult({ hits: updatehits, page });
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onDelete = (id) => {
    const isNotId = (item) => item.objectID !== id;

    const updatehits = result.hits.filter(isNotId);
    const updateResult = { ...result, hits: updatehits };
    setResult(updateResult);
  };

  const fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result))
      .catch((error) => error);
  };

  useEffect(() => {
    fetchSearchTopStories(searchTerm);
  }, [searchTerm]);

  return (
    <div className='page'>
      <div className='interactions'>
        <Search value={searchTerm} onChange={onSearchChange}>
          Search
        </Search>
      </div>

      {result && <Table list={result.hits} onDelete={onDelete} />}

      <div className='interactions'>
        <Button onClick={() => fetchSearchTopStories(searchTerm, page + 1)}>
          More
        </Button>
      </div>
    </div>
  );
};

export default App;
