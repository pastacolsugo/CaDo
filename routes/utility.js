var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('utility');
    res.render('index', { title: 'Utilities' });
});

router.get('/jquery', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/jQuery.js'));
});

router.get('/font/dejavumono', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono.ttf'));
});

router.get('/alert', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', '/public/alert.ico'));
})

router.get('/profilePic', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/public/unnamed.ico'));
})

module.exports = router;
