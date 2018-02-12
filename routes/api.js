var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

function pwdgen() {
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
    return pwd;    
}

router.get('/contest', function (req, res, next) {
    //this function will serve user personalized contest details used to populate the main page
    res.type('.json');
    res.send(JSON.stringify({
        "name": "Contest di prova "+pwdgen(),
        "end_date": new Date(new Date().getTime() + 3 * 3600000),
        "tasks": [
            {
                "name": "noccioline",
                "full_name": "Secchi di noccioline",
                "score": 100
            },
            {
                "name": "magneti",
                "full_name": "Allineamento magnetico",
                "score": 85
            },
            {
                "name": "taxi",
                "full_name": "Viaggi in taxi",
                "score": 60
            },
            {
                "name": "gravity",
                "full_name": "Assenza di gravità",
                "score": 100
            },
            {
                "name": "canoa",
                "full_name": "Canottaggio",
                "score": 10
            },
            {
                "name": "fuga",
                "full_name": "Fuga dagli inseguitori",
                "score": 5
            },
            {
                "name": "annoluce",
                "full_name": "Anno luce",
                "score": 100
            }
        ]
    }));
});

router.get('/alerts', function (req, res, next) {
    res.type('.json');
    res.send(JSON.stringify([
        { "task": "canoa", "id": "alert-9083thopnxd" }
    ]));
});

router.get('/task', function (req, res, next) {
    res.setHeader('Content-disposition', 'attachment; filename=' + req.query.task + '.pdf');//req.query.task is the name of the requested file
    res.type(".pdf");
    res.sendFile(path.join(__dirname, '/../', '/DatabaseScheme.pdf'))
});

router.get('/submissions', function (req, res, next) {
    //req.query.task
    res.type('.json');
    res.send(JSON.stringify([
        {
            "id":"lskjfhsldfuhla239875462398576jsdkfkah",
            "date":new Date(new Date().getTime() - 60000),
            "status":"evaluated",
            "score":90
        },
                {
            "id":"lskjfhsldfsdkjhf3375462398576jsdkfkah",
            "date":new Date(new Date().getTime() - 6000),
            "status":"evaluating",
            "score":null
        },
        {
            "id":"lskfjskhdldfuhla239875462398576jsdkfkah",
            "date":new Date(new Date().getTime() - 1000),
            "status":"compiling",
            "score":null
        }
    ]));
});

module.exports = router;
