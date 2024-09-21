import * as request from 'services/requester';

export const getFurniture = (queryString) => request.get(`furniture?${queryString}`);

export const getDetails = (id) => request.get(`furniture/${id}`);

export const edit = (id, newData) => request.put(`furniture/${id}`, newData);

export const create = (data) => request.post(`furniture`, data);

export const deleteFurniture = (id) => request.del(`furniture/${id}`);

export const getLocalCollection = (collectionName) => {
    return JSON.parse(localStorage.getItem(collectionName)) || [];
};

export const updateLocalCollection = (collectionName, updatedCollection) => {
    localStorage.setItem(collectionName, JSON.stringify(updatedCollection));
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

export const getItemFromCollection = (collection, id) => {
    return collection.find((el) => el.furnitureId === id);
};

export const handleLocalToggle = (id, added, collectionName, newQuantity = 1, update = false, updateLocalCollection) => {
    let updatedCollection = getLocalCollection(collectionName);
    const itemIndex = updatedCollection.findIndex((el) => el.furnitureId === id);

    if (added) {
        if (update && collectionName === 'cart') {
            updatedCollection[itemIndex].quantity = newQuantity;
        } else {
            updatedCollection.splice(itemIndex, 1);
        }
    } else {
        const itemInfo = collectionName === 'cart'
            ? { furnitureId: id, quantity: 1 }
            : { furnitureId: id };

        updatedCollection.push(itemInfo);
    }

    updateLocalCollection(collectionName, updatedCollection);
    return updatedCollection;
};

async function fetchAndFilterFurniture(collection) {
    const result = await getFurniture();
    const allFurniture = result.furniture;
    return allFurniture.filter(f => collection.some((el) => el.furnitureId === f._id));
}

function addQuantityToFurniture(furniture, collection) {
    return furniture.map((f) => {
        const itemFromLocalCollection = collection.find(el => el.furnitureId === f._id);
        f.quantity = itemFromLocalCollection.quantity;
        return f;
    });
}