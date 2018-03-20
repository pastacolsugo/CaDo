var express = require('express');
var router = express.Router();
var path = require('path');
function getSession() {
    //if there's no session available then return null
    //otherwise return a session object as described in DataBaseScheme.md
    return null;
    return {
        "id": "kjsengkjbs",
        "username": "some-user",
        "expire_date": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).toString(),
        "admin": true
    };//example session here;
}
function checkSession() {
    var session = getSession();
    /*console.log(new Date().getTime());
    console.log(session.expire_date);
    console.log(new Date(session.expire_date).getTime());*/
    return session === null ? false : (new Date().getTime() <= new Date(session.expire_date).getTime());
}
function checkConfig(){
  //function to check the configuration
  return true;
}

router.get('/', function (req, res, next) {
    if ((req.ip=='127.0.0.1' && connReady.local == false)||(req.ip!='127.0.0.1' && connReady.global == false)) {
      //if we can't accept a connection from this IP, then drop it
        var err = new Error('Forbidden');
        err.status = 403;
        err.CaDomsg="Prova"
        return next(err);
    }
    else if (req.ip == '127.0.0.1' && connReady.local == true && connReady.global == false) {
        //If there's no admin yet
    }
    else if (!checkConfig()) {
        //If the contest isn't configured yet
        //configure the contest
    }
    else if (!checkSession()) {
        //If the session is not valid
        res.redirect("/login");
    }
    else if (getSession().admin) {
        //if the user is an admin, the redirect him to the admin console
        res.redirect("/console");
    }
    else {
        //The session is valid and the user is not an admin, so the user is allowed to see the contest page
        res.redirect("/contest");
    }
});

router.get('/contest', function (req, res, next) {
    if ((req.ip=='127.0.0.1' && connReady.local == false)||(req.ip!='127.0.0.1' && connReady.global == false)) {
        //if we can't accept a connection from this IP, then drop it
          var err = new Error('Forbidden');
          err.status = 403;
          return next(err);
    }
    else if (!checkSession()) {
        //Hey, you haven't logged in!
        res.redirect("/login");
    }
    else if (!checkConfig()) {
        //The CaDo configuration is not complete
        if (getSession().admin) {
            //The user is an admin, so he's able to configure the CaDo
        }
        else {
            //This is a regular user, redirect him to a generic config-not-ready page
        }
    }
    if (checkConfig() && checkSession()) {
        //The user is authorized to view the contest
        res.sendFile(path.join(__dirname, '/../', '/views/contest.html'));
    }
});

module.exports = router;
