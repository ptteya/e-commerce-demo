const User = require('../models/User');

const getUserByEmail = (email) => User.findOne({ email });

const getById = (id) => User.findById(id);

const checkIfUserExists = async (email, username) => {
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    return user;
}

const toggleFavorites = async (action, userId, furnitureId) => {
    const user = await getById(userId);

    if (action === 'add') {
        if (!user.favorites.includes(furnitureId)) {
            user.favorites.push(furnitureId);
        } else {
            throw new Error('Furniture is already liked');
        }
    } else if (action === 'remove') {
        user.favorites = user.favorites.filter(id => id.toString() !== furnitureId);
    }

    await user.save();

    return user.favorites;
}

module.exports = {
    getUserByEmail,
    checkIfUserExists,
    getById,
    toggleFavorites
}