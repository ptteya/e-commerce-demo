exports.sanitizeUserObject = (user) => {
    const { password, __v, ...sanitizedUser } = user;
    return sanitizedUser;
};