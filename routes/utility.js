var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('utility');
    res.render('index', { title: 'Utilities' });
});

<<<<<<< HEAD
/*router.get('/jquery', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/jQuery.js'));
});*///Modifying theese commented lines you can serve files like frameworks
=======
router.get('/jquery', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/jQuery.js'));
});

router.get('/font/dejavumono', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono.ttf'));
});
>>>>>>> contestSetup

module.exports = router;
