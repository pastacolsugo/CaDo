var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(db);
  res.render('index', { title: 'Express' });
});

module.exports = router;
