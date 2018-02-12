var express = require('express');
var router = express.Router();
var path = require('path');

function login(user, pass) {
    //if authentication isn't successful, then return false. Otherwise, return true
    return true;
}

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/../', 'views/login.html'));
});
router.post('/', function(req, res, next){
    if (login(req.body.username, req.body.password)) {
        res.redirect('/');
    }
    else {
        res.redirect('login');
    }
});


module.exports = router;
