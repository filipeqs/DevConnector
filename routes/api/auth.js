const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get Auth User
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;
