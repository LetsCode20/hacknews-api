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
      {list.length ? (
        <div className='sort'>
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
      ) : null}

      {reverseSortedList.map((item) => (
        <div key={item.objectID} className='table-row'>
          <div className='table-column'>
            <span>
              <b>Title:</b>
              <a href={item.url} target='_blank' rel='noreferrer'>
                {item.title}
              </a>
            </span>
          </div>
          <div>
            <span>
              <b>Author:</b> {item.author}
            </span>
          </div>
          <div>
            <span>
              <b>Comments:</b> {item.num_comments}
            </span>
          </div>
          <div>
            <span>
              <b>Points:</b> {item.points}
            </span>
          </div>
          <div>
            <span>
              <Button
                onClick={() => onDelete(item.objectID)}
                className='button-inline'
              >
                Delete
              </Button>
            </span>
          </div>
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
