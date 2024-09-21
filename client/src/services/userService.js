import * as request from './requester';

export const login = (data) => request.post('auth/login', data);

export const register = (data) => request.post('auth/register', data);

export const logout = () => request.get('auth/logout');

export const getUserData = () => request.get('auth/me');

export const getAll = () => request.get('admin/users');

export const toggleUserRole = (userId, role) => request.post('admin/promote', { userId, role });

export const updateCollection = (action, collectionName, userId, furnitureId, quantity = 1) => request.post(`${collectionName}/${action}`, { userId, furnitureId, quantity });

export const handleAuthToggle = async (action, collectionName, userId, furnitureId, newQuantity, updateContextCollection) => {
    try {
        const result = await updateCollection(action, collectionName, userId, furnitureId, newQuantity);
        updateContextCollection(collectionName, result[collectionName]);
    } catch (error) {
        console.error(`Failed to update ${collectionName}:`, error.message);
    }
};
