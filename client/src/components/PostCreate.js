import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    if (!title.length) return;
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <button className='btn btn-primary'>Post</button>
      </form>
    </div>
  );
};
