const { verifyToken } = require('../utils/tokenUtil');

exports.authentication = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header) {
        try {
            req.user = verifyToken(header);
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