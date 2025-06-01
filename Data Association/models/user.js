const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test1');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // Ensures that usernames are unique
    },
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }] //array of ids
});

module.exports = mongoose.model('User', userSchema);