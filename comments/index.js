const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const comments = {};

app.get('/posts/:id/comments', (req, res) => {});

app.post('/posts/:id/comments', (req, res) => {});

app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});
