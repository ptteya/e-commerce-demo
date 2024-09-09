import { createContext, useEffect, useState } from "react";
import * as userService from '../services/userService';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [guestFavorites, setGuestFavorites] = useState([]);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const result = await userService.getUserData(token);
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Failed to verify token:", error.message);
            }
        }

        verifyToken();
    }, []);

    const setUserData = (token, user) => {
        localStorage.setItem('token', token);
        setUser(user);
    }

    const login = async (userData) => {
        try {
            const data = await userService.login(userData);
            setUserData(data.token, data.user);
            localStorage.removeItem('likedFurniture');
            navigate('/');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const register = async (userData) => {
        try {
            const data = await userService.register(userData);
            setUserData(data.token, data.user);
            localStorage.removeItem('likedFurniture');
            navigate('/')
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const logout = async () => {
        try {
            await userService.logout(user.token);
            localStorage.removeItem('token');
            setUser({});
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const updateFavorites = (newFavorites) => {
        setUser((state) => ({
            ...state,
            favorites: newFavorites
        }));
    }

    const updateGuestFavorites = (newFavorites) => {
        setGuestFavorites(newFavorites);
    }

    const context = {
        user,
        token: user.token,
        isAuthenticated: !!user.token,
        login,
        register,
        logout,
        updateFavorites,
        guestFavorites,
        updateGuestFavorites
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

