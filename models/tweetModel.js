const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
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
    post_imgs: {
        type: Array,
        required: false,
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
