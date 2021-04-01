const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) return res.status(400).send({ msg: 'There is no profile for this user.' });

        return res.send(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required.').not().isEmpty(),
            check('skills', 'Skills is required.').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });

        // Destructure the request
        const {
            website,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            // spread the rest of the fields we don't need to check
            ...rest
        } = req.body;

        // Build a profile object
        const profileFields = {
            user: req.user.id,
            website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
            skills: Array.isArray(skills)
                ? skills
                : skills.split(',').map((skill) => ' ' + skill.trim()),
            ...rest,
        };

        // Build socialFields object
        const socialFields = { youtube, twitter, instagram, linkedin, facebook };

        // normalize social fields to ensure valid url
        for (const [key, value] of Object.entries(socialFields)) {
            if (value && value.length > 0)
                socialFields[key] = normalize(value, { forceHttps: true });
        }
        // add to profileFields
        profileFields.social = socialFields;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true, setDefaultsOnInsert: true },
            );
            return res.send(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.send(profiles);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
