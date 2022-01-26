import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button.component';
import { SORTS } from '../../constants/constants';
import Sort from '../Sort/Sort.component';

const Table = ({
  list,
  page,
  onPaginatedSearch,
  onSort,
  isSortReverse,
  sortKey,
  onDelete,
}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className='table'>
      <div>
        <span>
          <Sort sortKey='TITLE' onSort={onSort}>
            Title
          </Sort>
        </span>
        <span>
          <Sort sortKey='AUTHOR' onSort={onSort}>
            Author
          </Sort>
        </span>
        <span>
          <Sort sortKey='COMMENTS' onSort={onSort}>
            Comments
          </Sort>
        </span>
        <span>
          <Sort sortKey='POINTS' onSort={onSort}>
            Points
          </Sort>
        </span>
      </div>

      {reverseSortedList.map((item) => (
        <div key={item.objectID} className='table-row'>
          <span>
            <a href={item.url} target='_blank' rel='noreferrer'>
              {item.title}
            </a>
          </span>
          <br />
          <span>{item.author}</span>
          <br />
          <span>{item.num_comments}</span>
          <br />
          <span>{item.points}</span>
          <br />
          <span>
            <Button
              onClick={() => onDelete(item.objectID)}
              className='button-inline'
            >
              Delete
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Table;
