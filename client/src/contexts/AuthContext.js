import { createContext, useEffect, useState } from "react";
import * as userService from 'services/userService';
import * as furnitureService from 'services/furnitureService';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [guestFavorites, setGuestFavorites] = useState([]);
    const [guestCart, setGuestCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const result = await userService.getUserData();
                setUser(result.user);
            } catch (error) {
                console.error("Failed to verify token:", error.message);
            } finally {
                setIsLoading(false);
            }
        }

        verifyToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const setUserData = (token, user) => {
        localStorage.setItem('token', token);
        setUser(user);
    };

    const login = async (userData) => {
        try {
            const data = await userService.login(userData);
            setUserData(data.token, data.user);
            localStorage.removeItem('favorites');
            localStorage.removeItem('cart');
            navigate('/');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const register = async (userData) => {
        try {
            const data = await userService.register(userData);
            setUserData(data.token, data.user);
            localStorage.removeItem('favorites');
            localStorage.removeItem('cart');
            navigate('/');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await userService.logout();
            localStorage.removeItem('token');
            setUser({});
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const updateCollection = (collectionName, newItems) => {
        setUser(state => ({
            ...state,
            [collectionName]: newItems
        }));
    };

    const updateLocalCollection = (collectionName, updatedCollection) => {
        if (updatedCollection.length === 0) {
            localStorage.removeItem(collectionName);
        } else {
            furnitureService.updateLocalCollection(collectionName, updatedCollection);
        }

        if (collectionName === 'favorites') {
            setGuestFavorites(updatedCollection);
        } else if (collectionName === 'cart') {
            setGuestCart(updatedCollection);
        }
    };

    const emptyCollection = async (collectionName) => {
        if (user.token) {
            try {
                await userService.clearCollection(user._id, collectionName);
                setUser(state => ({
                    ...state,
                    [collectionName]: []
                }));
            } catch (error) {
                console.error(error);
            }
        } else {
            updateLocalCollection(collectionName, []);
        }
    };

    const context = {
        user,
        token: user.token,
        isAuthenticated: !!user.token,
        login,
        register,
        logout,
        updateCollection,
        guestFavorites,
        guestCart,
        updateLocalCollection,
        emptyCollection,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

