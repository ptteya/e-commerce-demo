const User = require('../models/User');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const { handleErrorResponse } = require('../utils/errorUtil');
const { generateToken, addTokenToUser, getUserFromToken } = require('../utils/tokenUtil');
const { sanitizeUserObject } = require('../utils/userUtils');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return handleErrorResponse(res, 401, 'Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return handleErrorResponse(res, 401, 'Invalid email or password');
        }

        const token = generateToken(user);
        const userInfo = addTokenToUser(user, token);

        res.status(200).json({ token, user: userInfo });
    } catch (error) {
        handleErrorResponse(res, 500, null, error);
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
        const userInfo = addTokenToUser(newUser, token);
        res.status(200).json({ token, user: userInfo });
    } catch (error) {
        handleErrorResponse(res, 500, null, error);
    }
};

exports.logout = (req, res) => {
    res.status(204).json({});
};

exports.getUserData = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return handleErrorResponse(res, 401, 'Authorization token is missing');
    }

    try {
        const user = await getUserFromToken(token);
        res.status(200).json({ user });
    } catch (error) {
        handleErrorResponse(res, 401, null, error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usersInfo = await userService.getAll().lean();
        const users = usersInfo.map(user => sanitizeUserObject(user));
        res.status(200).json({ users });
    } catch (error) {
        handleErrorResponse(res, 500);
    }
};

exports.toggleUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const updatedUser = await userService.toggleRole(userId, role).lean();
        res.status(200).json({ user: sanitizeUserObject(updatedUser) });
    } catch (error) {
        handleErrorResponse(res, 500);
    }
};

exports.toggleFavorites = async (req, res) => handleAction(req, res, 'favorites');

exports.modifyCart = async (req, res) => handleAction(req, res, 'cart');

async function handleAction(req, res, collectionName) {
    const { userId, furnitureId, quantity } = req.body;
    const action = req.params.action;

    if (action !== 'add' && action !== 'remove' && action !== 'update') {
        return handleErrorResponse(res, 400, 'Invalid action');
    }

    try {
        const result = await userService.modifyCollection(collectionName, action, userId, furnitureId, quantity);
        res.status(200).json({ [collectionName]: result });
    } catch (error) {
        handleErrorResponse(res, 500, null, error);
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