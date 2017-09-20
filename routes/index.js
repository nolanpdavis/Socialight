var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/albums', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newalbum', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/album/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
