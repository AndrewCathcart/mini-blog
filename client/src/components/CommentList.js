import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'rejected':
        content = 'This comment has been rejected.';
        break;
      default:
        content = 'This comment is awaiting moderation.';
    }

    if (comment.status === 'approved') {
      content = comment.content;
    }

    return (
      <li className='list-group-item' key={comment.id}>
        {content}
      </li>
    );
  });

  return <ul className='list-group list-group-flush'>{renderedComments}</ul>;
};
