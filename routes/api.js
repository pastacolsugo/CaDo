var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/lipsum.js', function (req, res, next) {
    res.type('.js');
    res.sendFile(path.join(__dirname, '/../', 'public/scripts/lipsum.js'));
});

module.exports = router;
