const User = require('../models/User');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utils/errorUtil');
const { generateToken, verifyToken } = require('../utils/tokenUtil');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);
        const userInfo = createUserInfoObj(user, token);

        res.status(200).json({ token, user: userInfo });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const validationError = await validateRegisterData(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPass });
        await newUser.save();

        const token = generateToken(newUser);
        const userInfo = createUserInfoObj(newUser, token);

        res.status(200).json({ token, user: userInfo });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

exports.logout = (req, res) => {
    res.status(204).json({});
};

exports.getUserData = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is missing' });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const user = await userService.getById(payload._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userInfo = createUserInfoObj(user, token);
        res.status(200).json({ user: userInfo });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.toggleFavorites = async (req, res) => {
    const { userId, furnitureId } = req.body;
    const action = req.params.action;

    try {
        if (action !== 'add' && action !== 'remove') {
            return res.status(400).json({ error: 'Invalid action' });
        }

        const favorites = await userService.toggleFavorites(action, userId, furnitureId);

        res.status(200).json({ message: `Successfully ${action}ed to favorites`, favorites });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function validateRegisterData({ email, username, password, repeatPass }) {
    const existingUser = await userService.checkIfUserExists(email, username);
    if (existingUser) {
        return 'Email or username already exists';
    }

    if (!email || !username || !password) {
        return 'All Fields are required';
    }

    if (username.length < 4) {
        return 'Username should be at least 4 characters long!';
    }

    if (password !== repeatPass) {
        return 'Passwords do not match';
    }

    if (
        password.length < 6 ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return 'Password must be at least 6 characters long, contain at least one number, one lowercase and one uppercase letter.';
    }

    return null;
}

function createUserInfoObj(user, token) {
    const userObj = user.toObject();
    const { password: _, ...userInfo } = userObj;
    userInfo.token = token;
    return userInfo;
}

