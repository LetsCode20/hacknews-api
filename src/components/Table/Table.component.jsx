import React from 'react';
import Button from '../Button/Button.component';

const Table = ({ list, onDelete }) => {
  return (
    <div className='table'>
      {list.map((item) => (
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

export default Table;
