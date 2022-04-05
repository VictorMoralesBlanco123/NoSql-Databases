var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

var ClientsRouter = require('./routes/clients.js');
var InstructorsRouter = require('./routes/instructors.js');
var GroupsRouter = require('./routes/groups.js');

var app = express();
app.use(cors());
app.use(express.json());

app.use('/clients', ClientsRouter);
app.use('/instructors', InstructorsRouter);
app.use('/groups', GroupsRouter);

module.exports = app;
