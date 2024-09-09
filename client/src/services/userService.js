import * as request from './requester';

export const login = (data) => request.post('auth/login', data);

export const register = (data) => request.post('auth/register', data);

export const logout = (token) => request.get('auth/logout', null, token);

export const getUserData = (token) => request.get('auth/me', null, token);

export const updateFavorites = (action, userId, furnitureId) => request.post(`favorites/${action}`, { userId, furnitureId });

export const updateCart = (action, userId, furnitureId) => request.post(`cart/${action}`, { userId, furnitureId });