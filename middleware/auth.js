const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).send({ msg: 'No token, authorization denied!' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).send({ msg: 'Token is not valid!' });
    }
};
