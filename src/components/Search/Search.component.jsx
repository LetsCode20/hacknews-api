import React from 'react';

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={value} onChange={onChange} />
      <button>{children}</button>
    </form>
  );
};

export default Search;