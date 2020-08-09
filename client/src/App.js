import React from 'react';
import PostCreate from './components/PostCreate';

export default () => {
  return (
    <div className='container'>
      <h1 className='text-center'>mini-blog</h1>
      <h3 className='font-weight-light'>Create Post</h3>
      <PostCreate />
    </div>
  );
};
