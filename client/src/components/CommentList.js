import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li className='list-group-item' key={comment.id}>
        {comment.content}
      </li>
    );
  });

  return <ul className='list-group list-group-flush'>{renderedComments}</ul>;
};
