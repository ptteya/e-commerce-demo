import * as request from '../services/requester';

export const login = async (data) => {
    return request.post('auth/login', data);
}

export const register = async (data) => {
    return request.post('auth/register', data);
}