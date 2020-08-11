const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const eventBus = 'http://event-bus-srv:4005';
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = uuidv4();
  const { content } = req.body;
  const postId = req.params.id;
  const status = 'pending';

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status });
  commentsByPostId[postId] = comments;

  await axios.post(`${eventBus}/events`, {
    type: 'CommentCreated',
    data: { id: commentId, content, postId, status },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log(`Received Event: ${req.body.type}`);
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post(`${eventBus}/events`, {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});
