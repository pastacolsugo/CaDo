var express = require('express');
var router = express.Router();
var path = require('path');



function getSession() {
    //if there's no session available then return null
    //otherwise return a session object as described in DataBaseScheme.md
    return {
        "id": "kjsengkjbs",
        "username": "some-user",
        "expire_date": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toString()
    };//example session here;
}
function checkSession() {
    var session = getSession();
    /*console.log(new Date().getTime());
    console.log(session.expire_date);
    console.log(new Date(session.expire_date).getTime());*/
    return session === null ? false : (new Date().getTime() <= new Date(session.expire_date).getTime());
}

router.get('/', function (req, res, next) {
    if (!checkSession()) {
        res.redirect("/login");
    }
    else {
        res.redirect("/contest");
    }
});

router.get('/contest', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/../', '/views/contest.html'));
});

module.exports = router;
