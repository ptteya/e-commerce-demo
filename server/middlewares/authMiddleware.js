const { verifyToken } = require('../utils/tokenUtil');
const { handleErrorResponse } = require('../utils/errorUtil');

exports.authentication = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header) {
        try {
            req.user = verifyToken(header);
        } catch (error) {
            return handleErrorResponse(res, 403, 'Invalid token');
        }
    }

    next();
};

exports.requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        handleErrorResponse(res, 401, 'Authentication required');
    }
};

exports.requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        handleErrorResponse(res, 403, 'Permission denied: Admin access required');
    }
};