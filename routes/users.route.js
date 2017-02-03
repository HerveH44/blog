var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Verify = require('./verify');
var Users = require('../models/users.model');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/register')
.post(function(req, res, next){
  Users.register(new Users({ username : req.body.username }),
    req.body.password, function(err, user) {
      if (err) {
          console.log(err);
          return res.status(500).json({
            user: req.body.username,
            message: err.message
          });
      }
      passport.authenticate('local')(req, res, function () {
          var token = Verify.getToken(req.user);
          return res.status(200).json({
            status: 'Registration Successful!',
            token: token
          });
      });
  });
});

userRouter.route('/login')
.post(function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
  if (err) {
    return next(err);
  }
  if (!user) {
    return res.status(401).json({
      err: info // info.name & info.message
    });
  }
  req.logIn(user, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: 'Could not log in user'
      });
    }

    var token = Verify.getToken(user);

    res.status(200).json({
      status: 'Login successful!',
      success: true,
      access_token: token
    });
  });
})(req,res,next);
});

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = userRouter;
