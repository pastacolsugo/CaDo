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

router.get('/alert', function (req, res, next) {
    res.type('.svg');
    res.sendFile(path.join(__dirname, '/../', '/public/alert.svg'));
})

router.get('/profilePic', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/public/unnamed.ico'));
})
router.get('/font/dejavumono-bold', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono-Bold.ttf'));
});

router.get('/font/dejavumono-boldOblique', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono-BoldOblique.ttf'));
});

router.get('/font/dejavumono-Oblique', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono-Oblique.ttf'));
});

router.get('/master.css', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/stylesheets/master.css'));
});

//to be changed
router.get('/theme.css', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/stylesheets/themes/default.css'));
});

router.get('/login.css', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/stylesheets/login.css'));
});

module.exports = router;
