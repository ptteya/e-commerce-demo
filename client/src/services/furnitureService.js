import * as request from 'services/requester';

export const getByCategory = (category) => request.get(`furniture/catalog/${category}`);

export const getAll = () => request.get('furniture/catalog');

export const getGuestFavoritesIds = () => {
    return JSON.parse(localStorage.getItem('likedFurniture')) || [];
}

export const getDetails = (id) => request.get(`furniture/${id}`);

export const getFavoriteItems = async (user, isAuthenticated) => {
    const favoritesIds = user && isAuthenticated
        ? user.favorites
        : getGuestFavoritesIds();

    try {
        const result = await getAll();
        const allFurniture = result.furniture;
        const furniture = allFurniture.filter(f => favoritesIds.includes(f._id));
        return furniture;
    } catch (error) {
        console.error("Error fetching liked furniture:", error.message)
    }
}