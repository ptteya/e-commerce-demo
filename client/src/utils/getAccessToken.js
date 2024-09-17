export const getAccessToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    return token;
};
