var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/gym';

router.get('/', function(req, res, next) {
});

module.exports = router;
