const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    date: {
        type: Date, 
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    content: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the User model for likes
        }
    ]
});

module.exports = mongoose.model('post', postSchema);