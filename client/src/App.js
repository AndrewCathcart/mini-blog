import React, { useState, useEffect } from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';
import axios from 'axios';

export default () => {
  const [postTitle, setPostTitle] = useState('');
  const [posts, setPosts] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:4002/posts');

      setPosts(res.data);
    };

    fetchPosts();
    setReload(false);
  }, [reload]);

  const onPostSubmit = async (e) => {
    if (!postTitle.length) return;
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title: postTitle,
    });

    setPostTitle('');
    setReload(true);
  };

  return (
    <div className='container'>
      <h1 className='text-center'>mini-blog</h1>
      <h3>Create Post</h3>
      <PostCreate
        onSubmit={onPostSubmit}
        setTitle={setPostTitle}
        title={postTitle}
      />
      <hr />
      <h3>Posts</h3>
      <PostList posts={posts} reload={setReload} />
    </div>
  );
};
