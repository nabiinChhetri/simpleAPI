var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user');
var passwordHash = require('password-hash');

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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/**get all user list*/
router.get('/all', function(req, res, next) {
  UserModel.find({})
  .sort({
    _id : -1 // newest insert is at top
  })
  // .populate('user') 
  .exec(function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(users)
    }
  })
});

/**get single user by id*/
router.get('/:id', function(req, res, next) {
  var userId = req.params.id
  UserModel.findOne({
    _id: userId
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(user)
    }
  })
});

// update user
router.put('/:id', function(req, res, next) {
  UserModel.findById(req.params.id).exec(function(err, foundUser) {
    if (err) {
      return next(err);
    }
    if (foundUser) {
      console.log("User found >>", foundUser);
      // var updatedUser = new UserModel(); garnu parena kina vaney mathi bata foundUser vanney object aioraxa ani teslai use garney
      var updatedMappedUser = map_user_req(foundUser, req.body)
      updatedMappedUser.save(function(err,updatedUser) {
        if (err) {
          return  next(err);
        }else {
          res.status(200).json(updatedUser)
        }
      })
    }
  })

});

router.delete('/:id', function(req, res, next) {
  var userId = req.params.id;
  UserModel.findOne({
    _id: userId
  }).exec(function functionName(err, deleteUser) {
    if (err) {
      return next(err);
    } else {
      deleteUser.remove(function(err, done) {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({
            message: " User Deleted successfully"
          })
        }
      })
    }
  })
});



module.exports = router;
