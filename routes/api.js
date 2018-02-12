var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/contest', function (req, res, next) {
    //this function will serve user personalized contest details used to populate the main page
    res.type('.json');
    res.send(JSON.stringify({
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
        "canoa"
    ]));
});

router.get('/task', function (req, res, next) {
    res.setHeader('Content-disposition', 'attachment; filename='+req.query.task+'.pdf');//req.query.task is the name of the requested file
    res.type(".pdf");
    res.sendFile(path.join(__dirname, '/../', '/DatabaseScheme.pdf'))
})

module.exports = router;
