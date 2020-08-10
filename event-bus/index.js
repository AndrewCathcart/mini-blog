const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const subscribers = [
  'http://localhost:4000/events',
  'http://localhost:4001/events',
  'http://localhost:4002/events',
];

app.post('/events/', (req, res) => {
  const event = req.body;

  subscribers.forEach((subscriber) => {
    axios.post(subscriber, event);
  });

  res.send({ status: 'ACK' });
});

app.listen('4005', () => {
  console.log('event-bus listening on port 4005');
});
