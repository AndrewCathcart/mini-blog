const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const eventBus = 'http://event-bus-srv:4005';
const posts = {};

app.post('/posts/create', async (req, res) => {
  const id = uuidv4();
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post(`${eventBus}/events`, {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(`Received Event: ${req.body.type}`);

  res.send({});
});

app.listen(4000, () => {
  console.log('Posts service listening on port 4000');
});
