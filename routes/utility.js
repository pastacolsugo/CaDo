var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log ('utility');
});

router.get('/jquery', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/jQuery.js'));
});

router.get('/font/dejavumono', function(req, res, next){
    res.sendFile(path.join(__dirname, '/../', 'public/utility/font/DejaVuSansMono.ttf'));
});

router.get('/styles/contestSetup', function (req, res, next) {
    res.header("Content-Type", "text/css");
    var css = fs.readFileSync(path.join(__dirname, '/../', 'public/stylesheets/contestSetup.css'), "utf8");
    var theme = JSON.parse(fs.readFileSync(path.join(__dirname, '/../', 'public/stylesheets/styles/' + req.query.theme + '.json'), "utf8"));
    var keys = ["pri", "sec-a", "sec-b"];
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 5;j++){
            css = css.replace(new RegExp(keys[i] + '-' + j.toString(), 'g'), theme[5 * i + j]);
        }
    }
    res.send(css);
});

module.exports = router;
