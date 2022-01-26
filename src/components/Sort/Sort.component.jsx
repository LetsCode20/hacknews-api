import React from 'react';
import Button from '../Button/Button.component';

const Sort = ({ sortKey, onSort, children }) => (
  <Button onClick={() => onSort(sortKey)}>{children}</Button>
);

export default Sort;
