import * as request from './requester';

export const login = (data) => request.post('users/login', data);

export const register = (data) => request.post('users/register', data);

export const logout = () => request.get('users/logout');

export const getUserData = () => request.get('users/me');

export const getAll = () => request.get('admin/users');

export const toggleUserRole = (userId, role) => request.post('admin/promote', { userId, role });

export const updateCollection = (action, collectionName, userId, furnitureId, quantity = 1) => request.post(`users/${collectionName}/${action}`, { userId, furnitureId, quantity });

export const handleAuthToggle = async (action, collectionName, userId, furnitureId, newQuantity, updateContextCollection) => {
    try {
        const result = await updateCollection(action, collectionName, userId, furnitureId, newQuantity);
        updateContextCollection(collectionName, result[collectionName]);
    } catch (error) {
        console.error(`Failed to update ${collectionName}:`, error.message);
    }
};
