import React, { useState } from 'react';
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
  const [list, setList] = useState(listObj);
  const [searchTerm, setSearchTerm] = useState('');

  const onDelete = (id) => {
    const isNotId = (item) => item.objectID !== id;

    const updateList = list.filter(isNotId);
    setList(updateList);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isSearched = (searchTerm) => (item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className='page'>
      <div className='interactions'>
        <Search value={searchTerm} onChange={onSearchChange} />
      </div>

      <Table
        list={list}
        pattern={searchTerm}
        onDelete={onDelete}
        isSearched={isSearched}
      />
    </div>
  );
};

export default App;
