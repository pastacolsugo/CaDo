var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    /*if ((req.ip=='127.0.0.1' && connReady.local == false)||(req.ip!='127.0.0.1' && connReady.global == false)) {
        var err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }    */
    //Enable here if you want to enable the initial configuration IP check
  res.sendFile(path.join(__dirname, '/../', '/views/login.html'));
});

module.exports = router;
