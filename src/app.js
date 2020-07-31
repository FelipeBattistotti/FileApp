const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const api = require('./api');

const app = express();

/* // PRODUÇÃO
app.use(cors({
  origin: 'http://meuapp.com'
}));
*/

app.use(cors()); //DEV
app.use(express.json());
app.use(api);
app.use(errors());

module.exports = app;
