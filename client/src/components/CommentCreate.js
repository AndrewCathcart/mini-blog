import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    if (!content.length) return;
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent('');
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='col-form-label'>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Comment</button>
      </form>
    </div>
  );
};