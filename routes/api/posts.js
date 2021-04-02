const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const auth = require('../../middleware/auth');

// @route   Post api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, check('text', 'Text is required.').not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });

        const post = await newPost.save();

        res.send(post);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send('Server Error');
    }
});

// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        return res.send(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send('Server Error');
    }
});

module.exports = router;
