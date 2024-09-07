import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export const Logout = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, []);

    return <Navigate to={'/'}></Navigate>
}