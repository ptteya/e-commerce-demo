import * as furnitureService from 'services/furnitureService';

export const getLocalCollection = (collectionName) => {
    return JSON.parse(localStorage.getItem(collectionName)) || [];
};

export const toggleGuestCollection = (id, collectionName, action) => {
    let collection = getLocalCollection(collectionName);
    const itemIndex = collection.findIndex((el) => el.furnitureId === id);

    if (action === 'remove' && itemIndex !== -1) {
        collection.splice(itemIndex, 1);
    } else {
        const itemInfo = { furnitureId: id, ...(collectionName === 'cart' && { quantity: 1 }) };
        collection.push(itemInfo);
    }
    return collection;
};

export const updateGuestQuantity = (id, collectionName, newQuantity) => {
    const collection = getLocalCollection(collectionName);
    return collection.map(item =>
        item.furnitureId === id ? { ...item, quantity: newQuantity } : item
    );
};

const fetchAndFilterFurniture = async (collection) => {
    const { data: furniture } = await furnitureService.getFurniture();
    const furnitureIds = new Set(collection.map(item => item.furnitureId));
    return furniture.filter(f => furnitureIds.has(f._id));
};

const addQuantityToFurniture = (furniture, collection) => {
    const collectionMap = new Map(collection.map(item => [item.furnitureId, item.quantity]));

    return furniture.map(f => ({
        ...f,
        quantity: collectionMap.get(f._id) || 0,
    }));
};

export const getCollectionItems = async (collectionName, user, isAuthenticated) => {
    const collection = isAuthenticated
        ? user[collectionName]
        : getLocalCollection(collectionName);

    try {
        const furniture = await fetchAndFilterFurniture(collection);
        return collectionName === 'cart'
            ? addQuantityToFurniture(furniture, collection)
            : furniture;
    } catch (error) {
        console.error(`Error fetching furniture:`, error.message);
    }
};