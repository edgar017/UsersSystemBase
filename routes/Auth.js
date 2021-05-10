var express = require('express');
var router = express.Router();
const pool = require('../libs/Configs/MySQL');

/* GET users listing. */
router.get('/Login', function(req, res, next) {
    res.render('Login');
});

router.get('/Register', function(req, res, next) {
  res.render('Register');
});

router.get('/Forgot', function(req, res, next) {
  res.render('Forgot');
});

router.get('/Restore', function(req, res, next) {
  res.render('Restore');
});

module.exports = router;
