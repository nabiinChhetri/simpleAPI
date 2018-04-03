var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

module.exports = function(config) {
  function createToken(data,config) {
    var token = jwt.sign({
      user : data._id
    }, config.app.jwtSecret/**,{ expiresIn: '1h' }*/);
    return  token;
  }
  function map_user_req(user, userDetails) {
    //userDetails vaneko request ko body ho
    if (userDetails.firstName)
      user.firstName = userDetails.firstName;
    if (userDetails.lastName)
      user.lastName = userDetails.lastName;
    if (userDetails.address)
      user.address = userDetails.address;
    if (userDetails.email)
      user.email = userDetails.email;
    if (userDetails.phoneNumber)
      user.phoneNumber = userDetails.phoneNumber;
    if (userDetails.username)
      user.username = userDetails.username;
    if (userDetails.password)
      user.password = passwordHash.generate(userDetails.password);

    return user;
  }

  function validateSignup(req) {
    req.checkBody('firstName', 'firstName is required').notEmpty();
    req.checkBody('lastName', 'lastName is required').notEmpty();
    req.checkBody('address', 'address is required').notEmpty();
    req.checkBody('phoneNumber', 'phoneNumber is required').notEmpty();
    req.checkBody('email', 'email should be in valid format').isEmail();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password should not exceed 12 characters').isLength({
      max: 12
    });
    req.checkBody('password', 'password should exceed 8 characters').isLength({
      min: 8
    });
    var errorSignup = req.validationErrors();
    if (errorSignup) {
      console.log(errorSignup);
      return errorSignup;
    } else {
      return null;
    }
  }

  /**
  Get home page*/
  router.get('/', function(req, res, next) {
    res.send('this is home page');
  });

  /**Signup USer **/
  router.post('/signup', function(req, res, next) {
    var err = validateSignup(req);
    if(err){
      return next(err);
    }
    var newUser = new UserModel();
    var newMappedUser = map_user_req(newUser, req.body)

    newMappedUser.save(function(err, savedUser) {
      if (err) {
        return next(err);
      } else {
        console.log("User registered successfully", savedUser);
        res.status(200).json(savedUser);
      }
    })


  });

  /**login USer **/
  router.post('/login', function(req, res, next) {
    //express validation
    UserModel.findOne({
      username: req.body.username
    }).exec(function(err, userFound) {
      if (err) {
        return next(err)
      } else {
        console.log("User found", userFound);
        if (userFound) {
          var passwordMatched = passwordHash.verify(req.body.password, userFound.password)
          if (passwordMatched) {
            console.log("Username and password matched", userFound);
            //We neeed to create token for every login
            var token = createToken(userFound, config);
            res.status(200).json({
              user : userFound,
              token: token
            });

          } else {
            res.status(400).json({
              message: "Incorrect Password"
            })
          }

        } else {
          console.log("Sorry User not Found");
          res.status(400).json({
            message: "User not found please register to login"
          })
        }

      }
    })
  });

  return router;
};
