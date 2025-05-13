const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const auth = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ message: 'No authorization token provided.' });
        }

        // Extract token from Bearer token format
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ message: 'Invalid token format.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).send({ message: 'Invalid token payload.' });
        }

        // Find the user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send({ message: 'User not found.' });
        }

        // Attach user data to request object
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).send({ message: 'Please authenticate.', error: error.message });
    }
};

module.exports = auth;