import { createContext, useState } from "react";
import * as authService from '../services/authService';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const setUserData = (token, user, setUser) => {
        localStorage.setItem('token', token);
        setUser(user);
    }

    const login = async (userData) => {
        try {
            const data = await authService.login(userData);
            setUserData(data.token, data.user, setUser);
            navigate('/');
        } catch (err) {
            throw new Error(err.error);
        }
    }

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            setUserData(data.token, data.user, setUser);
            navigate('/')
        } catch (err) {
            throw new Error(err.error);
        }
    }

    const context = {
        user,
        login,
        register,
        token: user.token,
        isAuthenticated: !!user.token
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

