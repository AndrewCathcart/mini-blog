const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const postsService = 'http://localhost:4000/events';
const commentsService = 'http://localhost:4001/events';
const queryService = 'http://localhost:4002/events';
const moderationService = 'http://localhost:4003/events';

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
    axios.post(subscriber, event);
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
