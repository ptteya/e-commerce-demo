import * as request from '../services/requester';

export const login = (data) => request.post('auth/login', data);

export const register = (data) => request.post('auth/register', data);

export const logout = (token) => request.get('auth/logout', null, token);