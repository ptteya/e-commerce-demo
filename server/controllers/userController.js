const userService = require('../services/userService');
const { handleErrorResponse } = require('../utils/errorUtil');
const { sanitizeUserObject } = require('../utils/userUtils');

exports.login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 401, error });
    }
};

exports.register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 400, error });

    }
};

exports.logout = (req, res) => {
    res.status(204).json({});
};

exports.getUserData = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return handleErrorResponse({ res, statusCode: 401, message: 'Authorization token is missing' });
    }

    try {
        const user = await userService.getUserFromToken(token);
        res.status(200).json({ data: user });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 401, error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usersInfo = await userService.getAll().lean();
        const users = usersInfo.map(user => sanitizeUserObject(user));
        res.status(200).json({ data: users });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};

exports.toggleUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const updatedUser = await userService.toggleRole(userId, role).lean();
        const sanitizedUser = sanitizeUserObject(updatedUser);
        res.status(200).json({ data: sanitizedUser });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};

exports.addToCollection = async (req, res) => modifyUserCollection(req, res, 'add');
exports.removeCollectionItem = async (req, res) => modifyUserCollection(req, res, 'remove');
exports.updateCollectionItem = async (req, res) => modifyUserCollection(req, res, 'update');

exports.emptyCollection = async (req, res) => {
    try {
        await userService.emptyCollection(req.body.userId, req.params.collection);
        res.status(204).send();
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};

async function modifyUserCollection(req, res, action) {
    const { userId, quantity } = req.body;
    const furnitureId = req.body.furnitureId || req.params.furnitureId;
    const { collection } = req.params;

    try {
        const result = await userService.modifyCollection(collection, action, userId, furnitureId, quantity);
        res.status(200).json({ data: result });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500, error });
    }
}