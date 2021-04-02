const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const auth = require('../../middleware/auth');

// @route   POST api/posts
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

// @route   GET api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).send({ msg: 'Post not found!' });

        return res.send(post);
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        return res.status(400).send('Server Error');
    }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).send({ msg: 'Post not found!' });

        // Check user
        if (post.user.toString() !== req.user.id)
            return res.status(401).send({ msg: 'User not authorized!' });

        await post.remove();

        return res.send({ msg: 'Post removed.' });
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        return res.status(400).send('Server Error');
    }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) return res.status(404).send({ msg: 'Post not found!' });

        // Check if post has already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).send({ msg: 'Post already liked.' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();

        return res.send(post.likes);
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        return res.status(400).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) return res.status(404).send({ msg: 'Post not found!' });

        // Check if post has already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).send({ msg: 'Post has not yet been liked.' });
        }

        post.likes = post.likes.filter((like) => like.user.toString() !== req.user.id);

        await post.save();

        return res.send(post.likes);
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        return res.status(400).send('Server Error');
    }
});

module.exports = router;
