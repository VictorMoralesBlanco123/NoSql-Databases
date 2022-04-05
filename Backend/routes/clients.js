var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/gym';

router.post('/add', function (req, res) {
    let form = req.body;
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

router.get('/list', function (req, res) {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
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


router.get('/search/:param', (req, res) => {
    let param = req.params.param;
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('gym');
        let query = {
            $or: [{
                first_name: new RegExp(param, 'i')
            },
            {
                last_name: new RegExp(param, 'i')
            },
            {
                phone: new RegExp(param, 'i')
            },
            {
                address: new RegExp(param, 'i')
            }]
        };
        dbo.collection('clients').find(query).toArray((err, result) => {
            if (err) throw err;
            db.close();
            res.send(JSON.stringify(result));
            res.end();
        });
    });
});

router.put('/update/:updateid', function (req, res) {
    let updateid = req.params.updateid;
    let form = req.body;
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('gym');
        let query = { _id: new mongodb.ObjectId(updateid) };
        let newValues = { $set: form };
        dbo.collection('clients').updateOne(query, newValues, (err, result) => {
            if (err) throw err;
            db.close();
            res.end();
        });
    });
});

router.delete('/delete/:id', function (req, res) {
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('gym');
        let param = {
            _id: new mongodb.ObjectId(req.params.id)
        };
        dbo.collection('clients').deleteOne(param, (err, result) => {
            if (err) throw err;
            db.close();
            res.end();
        });
    });
})

module.exports = router;
