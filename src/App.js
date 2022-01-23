import React, { useEffect, useState } from 'react';
import Search from './components/Search.component';
import Table from './components/Table.component';

const App = () => {
  const listObj = [
    {
      title: 'React',
      url: 'https://facebook.github.io/react/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://github.com/reactjs/redux',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const DEFAULT_QUERY = 'redux';
  const PATH_BASE = 'https://hn.algolia.com/api/v1';
  const PATH_SEARCH = '/search';
  const PARAM_SEARCH = 'query=';
  const PATH_URL = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${DEFAULT_QUERY}`;

  const [list, setList] = useState(listObj);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState(null);

  const setSearchTopStories = (result) => {
    setResult({ result });
  };

  useEffect(() => {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result))
      .catch((error) => error);
  }, [searchTerm]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onDelete = (id) => {
    const isNotId = (item) => item.objectID !== id;

    const updateList = list.filter(isNotId);
    setList(updateList);
  };

  const isSearched = (searchTerm) => (item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

  if (!result) {
    return null;
  }

  return (
    <div className='page'>
      <div className='interactions'>
        <Search value={searchTerm} onChange={onSearchChange} />
      </div>

      <Table
        list={result.hits}
        pattern={searchTerm}
        onDelete={onDelete}
        isSearched={isSearched}
      />
    </div>
  );
};

export default App;
