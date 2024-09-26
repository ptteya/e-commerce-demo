import * as request from 'services/requester';

export const getFurniture = (queryString) => {
    const path = queryString ? `furniture?${queryString}` : 'furniture'
    return request.get(path);
};

export const getDetails = (id) => request.get(`furniture/${id}`);

export const edit = (id, newData) => request.put(`furniture/${id}`, newData);

export const create = (data) => request.post(`furniture`, data);

export const deleteFurniture = (id) => request.del(`furniture/${id}`);