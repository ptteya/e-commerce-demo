import * as request from './requester';

export const login = (data) => request.post('users/login', data);

export const register = (data) => request.post('users/register', data);

export const logout = () => request.get('users/logout');

export const getUserData = () => request.get('users/me');

export const getAll = () => request.get('admin/users');

export const toggleUserRole = (userId, role) => request.post('admin/promote', { userId, role });

export const modifyCollection = (action, collectionName, userId, furnitureId, quantity) => {
    switch (action) {
        case 'add':
            return request.post(`users/${collectionName}`, { userId, furnitureId, quantity });
        case 'remove':
            return request.del(`users/${collectionName}/${furnitureId}`, { userId });
        case 'update':
            return request.patch(`users/${collectionName}/${furnitureId}`, { userId, quantity });
        default:
            return Promise.reject(new Error(`Invalid action: ${action}`));
    }
};

export const clearCollection = (userId, collectionName) => request.del(`users/${collectionName}`, { userId });

export const verifyUserToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const { data } = await getUserData();
        return data;
    } catch (error) {
        console.error("Failed to verify token:", error.message);
        return null;
    }
};