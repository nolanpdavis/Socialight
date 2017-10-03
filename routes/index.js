var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

router.get('/albums', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

router.get('/newalbum', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

router.get('/signup', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

router.get('/album/*', function(req, res, next) {
  res.render('index', { title: 'Socialight' });
});

module.exports = router;
