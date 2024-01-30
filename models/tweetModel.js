const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    post_content: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        // default: Date.now,
    },
    // likes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //     }
    // ],
    // retweets: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Post',
    //     }
    // ],
    // Add more fields as needed (e.g., media, comments, etc.)
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
