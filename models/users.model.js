// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var userSchema = new Schema({
    username: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);

// the schema is useless so far
// we need to create a model using it
var Users = mongoose.model('User', userSchema);

// make this available to our Node applications
module.exports = Users;
