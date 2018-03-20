var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    var err = new Error('Forbidden');
    err.status = 403;
    err.CaDomsg="Nothing to see here!"
    return next(err);
});

//to be changed
router.get('/theme.css', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/stylesheets/themes/default.css'));
});

module.exports = router;
