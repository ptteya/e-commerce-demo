import * as request from 'services/requester';

export const getByCategory = (category) => request.get(`furniture/catalog/${category}`);

export const getAll = () => request.get('furniture/catalog');

export const getDetails = (id) => request.get(`furniture/${id}`);

export const getLocalCollection = (collectionName) => {
    return JSON.parse(localStorage.getItem(collectionName)) || [];
}

export const getCollectionItems = async (collectionName, user, isAuthenticated) => {
    const favoritesIds = user && isAuthenticated
        ? user[collectionName]
        : getLocalCollection(collectionName);

    try {
        const result = await getAll();
        const allFurniture = result.furniture;
        const furniture = allFurniture.filter(f => favoritesIds.includes(f._id));
        return furniture;
    } catch (error) {
        console.error(`Error fetching furniture:`, error.message)
    }
}