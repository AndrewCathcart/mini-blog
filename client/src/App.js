import React from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

export default () => {
  return (
    <div className='container'>
      <h1 className='text-center'>mini-blog</h1>
      <h3>Create Post</h3>
      <PostCreate />
      <hr />
      <h3>Posts</h3>
      <PostList />
    </div>
  );
};
