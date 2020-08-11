const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const postsService = 'http://posts-clusterip-srv:4000';
const commentsService = 'http://comments-srv:4001';
const queryService = 'http://query-srv:4002';
const moderationService = 'http://moderation-srv:4003';

const subscribers = [
  postsService,
  commentsService,
  queryService,
  moderationService,
];

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  subscribers.forEach((subscriber) => {
    axios.post(`${subscriber}/events`, event);
  });

  res.send({ status: 'ACK' });
});

// I realise real implementations of this are much more complex, this is just a naive implemention to try and fake what they are doing to handle event syncing
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen('4005', () => {
  console.log('event-bus listening on port 4005');
});
