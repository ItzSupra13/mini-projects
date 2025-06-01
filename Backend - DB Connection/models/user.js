const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test1");

const userSchema = new mongoose.Schema({
    image:String,
    email:String,
    name:String
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model with fields for image, email, and name.