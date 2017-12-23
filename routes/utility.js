var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log ('utility');
});

router.get('/jquery', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/jQuery.js'));
});

module.exports = router;