var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if ((req.ip=='127.0.0.1' && connReady.local == false)||(req.ip!='127.0.0.1' && connReady.global == false)) {
        var err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    res.render('index', { title: 'Express' });
});

module.exports = router;
