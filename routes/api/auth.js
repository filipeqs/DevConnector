const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Private
router.post(
    '/',
    [
        check('email', 'Please include a valid email.').isEmail(),
        check('password', 'Password id required.').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) return res.status(400).send({ errors: [{ msg: 'Invalid credentials!' }] });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).send({ errors: [{ msg: 'Invalid credentials!' }] });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                return res.send({ token });
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error.');
        }
    },
);

module.exports = router;
