import React from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default ({ posts, reload }) => {
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h4 className='font-weight-light'>{post.title}</h4>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} reload={reload} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-around'>
      {renderedPosts}
    </div>
  );
};
