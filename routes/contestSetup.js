var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', 'views/contestSetup.html'));
});

router.post('/form', function(req, res, next){
    console.log(req);
});

module.exports = router;
