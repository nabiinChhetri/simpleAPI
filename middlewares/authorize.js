var jwt = require('jsonwebtoken');
var config = require('./../config');

module.exports = function(req, res, next) {

  var token;
  	if (req.headers['x-access-token']) {
  		token = req.headers['x-access-token'];
  	}
  	if (req.headers['Authorization']) {
  		token = req.headers['Authorization'];
  	}
  	if (req.query.token) {
  		token = req.query.token
  	}

if (token) {
  jwt.verify(token, config.app.jwtSecret, function(err, done) {
  if (err) {
    console.log("Error in verifying token",err);
    next({
      message :"Invalid Token"
    });
  }else {
    console.log("User token verified", done);
    return next();
  }
});
}else {
  next({
    status : 401,
    message : 'Token not provided'
  })
}

};
