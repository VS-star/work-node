var mongoose = require('mongoose');  
var FriendSchema = new mongoose.Schema({  
  name: String,
  email: String,
  number: String,
  people:String,
  avatar:String,
});

mongoose.model('Friend', FriendSchema);

module.exports = mongoose.model('Friend');


