import * as request from '../services/requester';

export const getByCategory = (category) => request.get(`furniture/catalog/${category}`);

export const getAll = () => request.get('furniture/catalog');