var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/views/login.html'));
});

router.get('/contest', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', '/views/contest.html'));
});

module.exports = router;
