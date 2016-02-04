var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');

/*
  Accepts a secret token for authentication purposes. We attach this token to the userProperty specified.
  In this case, that is payload. This means we can access our token using req.payload

  We can pass this auth middleware in to our router paths to ensure users are logged in.
*/
var auth = jwt({secret: process.env.SECRET_TOKEN, userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Register a new user */
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please ensure that all fields have been filled out."
    });
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {return next(err);}
    return res.json({token: user.generateJWT()});
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please ensure that all fields have been filled out."
    });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {return next(err);}
    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
