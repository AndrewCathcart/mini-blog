import React from 'react';

export default ({ onSubmit, title, setTitle }) => {
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
