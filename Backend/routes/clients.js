var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/gym';

router.post('/add', function (req, res) {
    let form = req.body;
    console.log(form)
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('gym');
        dbo.collection('clients').insertOne(form, (err, result) => {
            if (err) throw err;
            db.close();
            res.end();
        });
    });
});

router.get('/list', function(req,res){
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('gym');
        dbo.collection('clients').find().toArray((err, result) => {
          if (err) throw err;
          db.close();
          res.send(JSON.stringify(result));
          res.end();
        });
      });
})

module.exports = router;
