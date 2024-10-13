const User = require('../models/User');
const { generateToken, addTokenToUser, verifyToken } = require('../utils/tokenUtil');

const getUserByEmail = (email) => User.findOne({ email });

const getById = (id) => User.findById(id);

const getAll = () => User.find();

const createNewUser = (userData) => User.create(userData);

const checkIfUserExists = async (email, username) => {
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    return user;
};

const generateAuthResponse = (user) => {
    const token = generateToken(user);
    const userInfo = addTokenToUser(user, token);
    return userInfo;
};

const login = async ({ email, password }) => {
    const user = await getUserByEmail(email);
    const isUserAuthenticated = user && await user.comparePassword(password);

    if (!isUserAuthenticated) {
        throw new Error('Invalid email or password');
    }

    return generateAuthResponse(user);
};

const register = async ({ email, username, password, repeatPass }) => {
    const existingUser = await checkIfUserExists(email, username);
    if (existingUser) {
        throw new Error('Email or username already exists');
    }

    if (password !== repeatPass) {
        throw new Error('Passwords do not match');
    }

    try {
        const user = await createNewUser({ email, username, password });
        return generateAuthResponse(user);
    } catch (error) {
        throw error;
    }
};

const toggleRole = (id, role) => {
    const newRole = role === 'user' ? 'admin' : 'user';
    return User.findByIdAndUpdate(id, { role: newRole }, { new: true });
};

const getUserFromToken = async (token) => {
    try {
        const payload = verifyToken(token);
        const user = await getById(payload._id);
        return addTokenToUser(user, token);
    } catch (error) {
        throw new Error(error);
    }
};

const emptyCollection = async (userId, collectionName) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { [collectionName]: [] },
        { new: true }
    );
    return updatedUser;
};

const modifyCollection = async (collection, action, userId, furnitureId, quantity) => {
    const user = await getById(userId);

    if (action === 'add') {
        addToCollection(collection, user, furnitureId, quantity);
    } else if (action === 'remove') {
        removeCollectionItem(collection, user, furnitureId);
    } else if (action === 'update' && collection === 'cart') {
        updateItemQuantity(collection, user, furnitureId, quantity);
    }

    await user.save();
    return user[collection].toObject();
};

const getItemIndex = (collection, furnitureId) => {
    return collection.findIndex(el => el.furnitureId.toString() === furnitureId);
};

function addToCollection(collection, user, furnitureId, quantity) {
    const itemIndex = getItemIndex(user[collection], furnitureId);

    if (itemIndex !== -1) {
        throw new Error(`Furniture is already in ${collection}`)
    }

    const item = { furnitureId, ...(collection === 'cart' && { quantity }) };
    user[collection].push(item);
}

function updateItemQuantity(collection, user, furnitureId, quantity) {
    const itemIndex = getItemIndex(user[collection], furnitureId);

    if (itemIndex === -1) {
        throw new Error(`Item not found in ${collection}`);
    }

    user[collection][itemIndex].quantity = quantity;
}

function removeCollectionItem(collection, user, furnitureId) {
    const itemIndex = getItemIndex(user[collection], furnitureId);

    if (itemIndex === -1) {
        throw new Error(`Item not found in ${collection}`);
    }

    user[collection].splice(itemIndex, 1);
}

module.exports = {
    getUserByEmail,
    getById,
    getAll,
    createNewUser,
    checkIfUserExists,
    login,
    register,
    toggleRole,
    getUserFromToken,
    emptyCollection,
    modifyCollection,
};