import { getAccessToken } from "utils/getAccessToken";

const host = 'http://localhost:5000';

async function requester(method, url, data) {
    const headers = { 'Content-Type': 'application/json' };

    const accessToken = getAccessToken();
    if (accessToken) {
        headers['Authorization'] = accessToken;
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${host}/${url}`, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        const errorMessage = result.error || result.message || 'Something went wrong';
        throw new Error(errorMessage);
    }

    return result;
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const patch = requester.bind(null, 'PATCH');
export const del = requester.bind(null, 'DELETE');