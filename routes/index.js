var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/views/login.html'));
});

router.get('/contest', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/views/contest.html'));
});
router.post('/', function(req, res, next){
    var body = req.body;

    console.log('Received POST request @ localhost:3000/:',
        '\nusername = ' + body['username'],
        '\npassword = ' + body['password']);

    res.status(200);
    res.end();
});

module.exports = router;
