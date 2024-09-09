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

const modifyCollection = async (collectionName, action, userId, furnitureId) => {
    const user = await getById(userId);
    const collection = user[collectionName];

    if (action === 'add') {
        if (!collection.includes(furnitureId)) {
            collection.push(furnitureId);
        } else {
            throw new Error(`Furniture is already in the ${collectionName}`);
        }
    } else if (action === 'remove') {
        user[collectionName] = collection.filter(id => id.toString() !== furnitureId);
    }

    await user.save();

    return user[collectionName];
};

module.exports = {
    getUserByEmail,
    checkIfUserExists,
    getById,
    modifyCollection,
}