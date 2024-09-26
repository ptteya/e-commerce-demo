import * as request from './requester';

export const login = (data) => request.post('users/login', data);

export const register = (data) => request.post('users/register', data);

export const logout = () => request.get('users/logout');

export const getUserData = () => request.get('users/me');

export const getAll = () => request.get('admin/users');

export const toggleUserRole = (userId, role) => request.post('admin/promote', { userId, role });

export const updateCollection = (action, collectionName, userId, furnitureId, quantity) => request.post(`users/${collectionName}/${action}`, { userId, furnitureId, quantity });

export const clearCollection = (userId, collectionName) => request.del(`users/${collectionName}`, { userId });

export const verifyUserToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const result = await getUserData();
        return result.user;
    } catch (error) {
        console.error("Failed to verify token:", error.message);
        return null;
    }
};