var mongoose = require('mongoose');


module.exports = function (config) {
mongoose.connect(config.mongodb.dbUrl + '/'+config.mongodb.dbName);
mongoose.connection.on('error',function(err) {
  console.log("Error in connecting database", err);
})
mongoose.connection.once('open',function(err) {
  		console.log('successfully connected to database');
})
};
