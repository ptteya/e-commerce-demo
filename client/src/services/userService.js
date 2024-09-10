import * as request from './requester';

export const login = (data) => request.post('auth/login', data);

export const register = (data) => request.post('auth/register', data);

export const logout = (token) => request.get('auth/logout', null, token);

export const getUserData = (token) => request.get('auth/me', null, token);

export const updateCollection = (action, collectionName, userId, furnitureId) => request.post(`${collectionName}/${action}`, { userId, furnitureId });