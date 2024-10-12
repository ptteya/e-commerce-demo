import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from 'services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const verifiedUser = await userService.verifyUserToken();
            if (verifiedUser) {
                setUser(verifiedUser);
            }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    const handleUserAction = async (actionFunction, userData) => {
        try {
            const { data: user } = await actionFunction(userData);
            setUser(user);
            localStorage.setItem('token', user.token);
            localStorage.removeItem('favorites');
            localStorage.removeItem('cart');
            navigate('/');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const login = (userData) => handleUserAction(userService.login, userData);
    const register = (userData) => handleUserAction(userService.register, userData);

    const logout = async () => {
        try {
            await userService.logout();
            localStorage.removeItem('token');
            setUser({});
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const context = {
        user,
        setUser,
        token: user.token,
        isAuthenticated: !!user.token,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};