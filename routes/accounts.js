const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Accounts } = require('../account.model');
const { default: mongoose } = require('mongoose');

router.get('/', (req, res) => {
    Accounts.find({})
    .then(docs => {
        res.send(docs);
    })
    .catch(err => {
        console.log('Error in Retrieving Accounts: ' + JSON.stringify(err, undefined, 2));
        res.status(500).send('Error in Retrieving Accounts');
    })
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Accounts.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('No record found with the given id');
            }
            res.send(doc);
        })
        .catch(err => {
            console.log('Error in Retrieving Account:', err);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/', (req, res) => {
    var acc = new Accounts({
        userId: req.body.userId,
        server: req.body.server,
        status: req.body.status
    });
    acc.save()
    .then(doc => {
        res.send(doc);
    })
    .catch(err => {
        console.log('Error in Account Save :' + JSON.stringify(err, undefined, 2));
        res.status(500).send('Error in Account Save');
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var acc = {
            userId: req.body.userId,
            server: req.body.server,
            status: req.body.status
        };

        Accounts.findByIdAndUpdate(req.params.id, { $set: acc }, { new: true })
        .then(doc => {
            if (!doc) {
                return res.status(400).send('No record found with the given id');
            }
            res.send(doc);
        })
        .catch(err => {
            console.log('Error in Account Update:', err);
            res.status(500).send('Internal Server Error');
        });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Accounts.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(400).send('No record found with the given id');
            }
            res.send(doc);
        })
        .catch(err => {
            console.log('Error in Account Delete:', err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;