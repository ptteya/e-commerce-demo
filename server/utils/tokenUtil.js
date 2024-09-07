const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}