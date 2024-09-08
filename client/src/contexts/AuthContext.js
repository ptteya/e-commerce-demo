import { createContext, useState } from "react";
import * as userService from '../services/userService';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const setUserData = (token, user) => {
        localStorage.setItem('token', token);
        setUser(user);
    }

    const login = async (userData) => {
        try {
            const data = await userService.login(userData);
            setUserData(data.token, data.user);
            navigate('/');
        } catch (err) {
            throw new Error(err.error);
        }
    }

    const register = async (userData) => {
        try {
            const data = await userService.register(userData);
            setUserData(data.token, data.user);
            navigate('/')
        } catch (err) {
            throw new Error(err.error);
        }
    }

    const logout = async () => {
        try {
            await userService.logout(user.token);
            localStorage.removeItem('token');
            setUser({});
        } catch (err) {
            console.error(err.error);
        }
    }

    const updateFavorites = (newFavorites) => {
        setUser((state) => ({
            ...state,
            favorites: newFavorites
        }));
    }

    const context = {
        user,
        token: user.token,
        isAuthenticated: !!user.token,
        login,
        register,
        logout,
        updateFavorites,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

