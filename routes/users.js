var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'cado';


/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    res.render("users", {msg: "Connected successfully to server"});
  
    const db = client.db(dbName);
  
    client.close();
  });
  
});

module.exports = router;
