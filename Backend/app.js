var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

var ClientsRouter = require('./routes/clients.js');

var app = express();
app.use(cors());
app.use(express.json());

app.use('/clients', ClientsRouter);

module.exports = app;
