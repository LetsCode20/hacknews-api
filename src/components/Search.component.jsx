import React from 'react';

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      <input type='text' value={value} onChange={onChange} />
      <button type='submit'>{children}</button>
    </form>
  );
};

export default Search;
