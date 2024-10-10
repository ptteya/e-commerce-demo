const { verifyToken } = require('../utils/tokenUtil');
const { handleErrorResponse } = require('../utils/errorUtil');

exports.authentication = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header) {
        try {
            req.user = verifyToken(header);
        } catch (error) {
            return handleErrorResponse({ res, statusCode: 403, message: 'Invalid token' });
        }
    }

    next();
};

exports.requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        handleErrorResponse({ res, statusCode: 401, message: 'Authentication required' });

    }
};

exports.requireGuest = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        handleErrorResponse({ res, statusCode: 401, message: 'Guest access only' });

    }
};

exports.requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        handleErrorResponse({ res, statusCode: 403, message: 'Permission denied: Admin access required' });
    }
};