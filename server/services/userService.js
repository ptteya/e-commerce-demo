const User = require('../models/User');

const getUserByEmail = (email) => User.findOne({ email });

const getById = async (id) => User.findById(id);

const checkIfUserExists = async (email, username) => {
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    return user;
}

const modifyCollection = async (collectionName, action, userId, furnitureId, quantity) => {
    const user = await getById(userId);
    let collection = user[collectionName].toObject();

    if (action === 'add') {
        collection = addToCollection(collectionName, collection, furnitureId, quantity);
    } else if (action === 'remove') {
        collection = collection.filter((el) => el.furnitureId.toString() !== furnitureId);
    } else if (action === 'update' && collectionName === 'cart') {
        collection = updateItemQuantity(collection, furnitureId, quantity);
    }

    user[collectionName] = collection;
    await user.save();
    return collection;
};

function addToCollection(collectionName, collection, furnitureId, quantity) {
    const isInCollection = collection.some((el) => el.furnitureId === furnitureId);

    if (isInCollection) {
        throw new Error(`Furniture is already in the ${collectionName}`)
    }

    const item = { furnitureId, ...(collectionName === 'cart' && { quantity }) };
    collection.push(item);

    return collection;
}

function updateItemQuantity(collection, furnitureId, quantity) {
    const cartItemIndex = collection.findIndex(el => el.furnitureId.toString() === furnitureId);

    if (cartItemIndex === -1) {
        throw new Error('Can not update furniture quantity');
    }

    collection[cartItemIndex].quantity = quantity;
    return collection;
}

module.exports = {
    getUserByEmail,
    checkIfUserExists,
    getById,
    modifyCollection,
}