const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.authentication = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header) {
        try {
            const user = jwt.verify(header, JWT_SECRET)
            req.user = user;
        } catch (error) {
            return res.status(403).json({ error: 'Invalid token' });
        }
    }

    next();
}

exports.requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
};