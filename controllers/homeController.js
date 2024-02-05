const userModel = require("../models/userModel");
const tweetModel = require("../models/tweetModel");
const passport = require("passport");
const fs = require("fs");

const home = async (req, res) => {
    let user = req.user;
    if (req.isAuthenticated()) {
        try {
            const post = await tweetModel.find({ userId: res.locals.users._id }).populate("userId");
            const allPosts = await tweetModel.find().sort({ createdAt: -1 }).populate("userId");
            return res.render("index", { user, allPosts, post, req  });
        } catch (error) {
            console.error(error);
        }
    }
    return res.redirect("/");
};

const addPost = async (req, res) => {
    const { post_content } = req.body;
    try {
        const user = req.user;
        const newPostData = {
            createdAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            userId: user._id,
        };

        if (post_content) {
            newPostData.post_content = post_content;
        }

        if (req.files && req.files["post_imgs"]) {
            newPostData.post_imgs = req.files["post_imgs"].map((file) => file.path);
        }

        const newPost = await tweetModel.create(newPostData);

        if (newPost) {
            return res.redirect("/home");
        }
    } catch (err) {
        console.log(err);
    }
};

const deletePost = async (req, res) => {
    try {
        let deletePostImgs = await tweetModel.findById(req.query.id);
        if (deletePostImgs.post_imgs && deletePostImgs.post_imgs.length > 0) {
            deletePostImgs.post_imgs.map((filePath) => {
                fs.unlinkSync(filePath);
            });
        }
        let deletePost = await tweetModel.findByIdAndDelete(req.query.id);
        return res.redirect("back");
    } catch (err) {
        console.log(err);
        return false;
    }
};

const editPost = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await tweetModel.findById(id);
        let user = req.user;
        const allPosts = await tweetModel.find().sort({ createdAt: -1 });
        return res.render("edit", { single, user, allPosts });
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updatePost = async (req, res) => {
    try {
        const { id, post_content } = req.body;
        const updatedPostcontent = {};

        if (post_content) {
            updatedPostcontent.post_content = post_content;
        }

        if (req.files && req.files["post_imgs"]) {
            const newImages = req.files["post_imgs"].map((file) => file.path);
            updatedPostcontent.post_imgs = newImages;

            const oldPost = await tweetModel.findById(id);
            if (oldPost.post_imgs && oldPost.post_imgs.length > 0) {
                oldPost.post_imgs.forEach((filePath) => {
                    fs.unlinkSync(filePath);
                });
            }
        }

        const updatedPost = await tweetModel.findByIdAndUpdate(
            id,
            updatedPostcontent
        );

        if (updatedPost) {
            return res.redirect("/home");
        } else {
            console.log("Failed to update post");
            return res.redirect("/home");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/home");
    }
};

const profile = async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            const user = req.user;
            const requestedUsername = req.params.username.toLowerCase();
            const requestedUser = await userModel.findOne({ name: { $regex: new RegExp("^" + requestedUsername, "i") } });

            if (!requestedUser) {
                return res.status(404).send('User not found');
            }

            if (user._id.toString() !== requestedUser._id.toString()) {
                return res.redirect(`/${user.name}`);
            }

            const allPosts = await tweetModel.find({ userId: requestedUser._id }).populate("userId");

            return res.render('profile', { allPosts, user: requestedUser });
        }

        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    home,
    addPost,
    deletePost,
    editPost,
    updatePost,
    profile,
};
