const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Filter = require('bad-words');
const filter = new Filter();

const app = express();
app.use(bodyParser.json());

const eventBus = 'http://event-bus-srv:4005';

app.post('/events', async (req, res) => {
  const { type } = req.body;
  let { data } = req.body;

  if (type === 'CommentCreated') {
    const status = filter.isProfane(data.content) ? 'rejected' : 'approved';
    data.status = status;

    await axios.post(`${eventBus}/events`, {
      type: 'CommentModerated',
      data,
    });
  }

  res.send({});
});

app.listen('4003', () => {
  ('Moderation service listening on port 4003');
});
