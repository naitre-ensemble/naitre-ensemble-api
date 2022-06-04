const axios = require("axios");

const express = require("express");
const pretty = require('express-prettify');
const cors = require('cors');
const helmet = require("helmet");
const { execQuery, execQueryWithParams } = require('./db');
const bodyParser = require('body-parser');
const app = express();

app.use(helmet());
app.use(pretty({ query: 'pretty' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', async function (req, res) {
  res.send('Welcome on API ');
});

app.post('/subscribe', async function (req, res) {
  const email = req.body.email;
  let query = `INSERT INTO contacts (email) VALUES ($1) RETURNING *`;
  const response = await execQueryWithParams(query, [email]);
  res.send(response.rows);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API naitre ensemble listen on port ${process.env.PORT ? process.env.PORT : '5000'}`);
})
