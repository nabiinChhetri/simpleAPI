var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address :{
    type : String
  },
  phoneNumber :{
    type : Number
  },
  username : {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps : true
});
 var userModel = mongoose.model('user',userSchema);
 module.exports = userModel;
