var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', 'views/contestSetup.html'));
});

router.get('/form', function(req, res, next){
    console.log(req);
});

module.exports = router;
