const User = require('../models/User');

const getUserByEmail = (email) => User.findOne({ email });

const checkIfUserExists = async (email, username) => {
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    return user;
}

module.exports = {
    getUserByEmail,
    checkIfUserExists
}