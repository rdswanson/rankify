var mongoose = require('mongoose');
// Using pbkdf2 to hash provided passwords
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


// TODO - User has playlists, post history, post score
var UserSchema = new mongoose.Schema({
    username: {type:String, lowercase:true, unique:true},
    hash: String,
    salt: String
});

UserSchema.method.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64);
};

UserSchema.method.validatePassword = function(password) {
  return this.hash === crypto.pbkdf2Sync(password, this.salt, 1000, 64);
}

UserSchema.method.generateJWT = function() {
  var today = new Date();
  var expiry = new Date(today);
  expiry.setDate(today.getDate() + 10); // Set expiry date 10 days from now
  return jwt.sign({_id: this._id, username: this.username, expiry: (expiry.getTime()/1000)}, process.env.SECRET_TOKEN);
}

mongoose.model('User', UserSchema);
