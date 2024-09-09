import * as request from '../services/requester';

export const getByCategory = (category) => request.get(`furniture/catalog/${category}`);

export const getAll = () => request.get('furniture/catalog');

export const getUserFavorites = async (user) => {
    try {
        const result = await getAll();
        const furniture = result.furniture;
        const likedItems = furniture.filter(f => user.favorites.includes(f._id));
        return likedItems;
    } catch (error) {
        console.error("Error fetching liked furniture:", error.message)
    }
}

export const getGuestFavorites = () => {
    return JSON.parse(localStorage.getItem('likedFurniture')) || [];
}
