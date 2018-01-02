var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

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

// retrieve contestSetup CSS and replace each theme color key (pri, sec-a, sec-b)
// with it's corresponding RGB color for the choosen theme
router.get('/styles/contestSetup', function (req, res, next) {
    res.header("Content-Type", "text/css");

    var cssFilePath = path.join(__dirname, '/../', 'public/stylesheets/contestSetup.css');

    var css = fs.readFileSync(cssFilePath, "utf8");

    // join theme path, the choosen theme is in req.query.theme
    var themePath = path.join(__dirname, '/../', 'public/stylesheets/styles/' + req.query.theme + '.json');

    // reading the theme file, containing each RGB color representation
    var themeFile = fs.readFileSync(themePath, "utf8");

    // parsing the file (string) into a Javascript Object with JSON.parse
    var theme = JSON.parse(themeFile);

    // each color is specified, in the css file, as
    // one of these keys, score, number [0-4]
    // E.g. : sec-a-3, or pri-0
    var keys = ["pri", "sec-a", "sec-b"];

    // iterate each key
    for (var i=0; i<keys.length; i++){
        // for each key iterate over the 5 tonalities
        for (var j=0; j<5; j++){
            // create a new Regex for that color
            var colorPlaceholderRegex = new RegExp(keys[i] + '-' + j.toString())

            // replace each 
            css = css.replace(colorPlaceholderRegex, theme[5 * i + j]);
        }
    }

    res.send(css);
});

router.get('/pwdgen', function (req, res, next) {//This MUST NOT be a route and is intended to be used in another one instead
    var dicFilePath = path.join(__dirname, '/../', 'private/en.dic');
    var dic = fs.readFileSync(dicFilePath, "utf8").split("\n");
    var pwdLen = 3;//Password length in words;
    var pwdSeparator = "-";//Separator between words
    var pwd = "";
    for (var i = 0; i < pwdLen; i++){
        var r = Math.random();
        r *= dic.length;
        r = (r - r % 1);
        console.log(r);
        if (i % 2 == 0) pwd += dic[r];
        else pwd += dic[r].toUpperCase();
        if (i < pwdLen - 1) pwd += '-';
    }
    res.send(pwd);
});


module.exports = router;
