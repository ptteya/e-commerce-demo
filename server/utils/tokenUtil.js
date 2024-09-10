const userService = require('../services/userService');
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

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

exports.addTokenToUser = (user, token) => {
    const userObj = user.toObject();
    const { password, __v, ...userInfo } = userObj;
    userInfo.token = token;
    return userInfo;
}

exports.getUserFromToken = async (token) => {
    try {
        const payload = exports.verifyToken(token);
        const user = await userService.getById(payload._id);
        return exports.addTokenToUser(user, token);
    } catch (error) {
        throw new Error(error);
    }
}
