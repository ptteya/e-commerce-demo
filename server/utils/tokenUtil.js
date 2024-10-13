const jwt = require('jsonwebtoken');
const { sanitizeUserObject } = require('./userUtils');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET);
};

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

exports.addTokenToUser = (user, token) => {
    const userObj = user.toObject();
    const userInfo = sanitizeUserObject(userObj);
    userInfo.token = token;
    return userInfo;
};