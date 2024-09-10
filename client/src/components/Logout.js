import { useContext, useEffect } from "react"
import { AuthContext } from "contexts/AuthContext"
import { Navigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, [logout]);

    return <Navigate to={'/'}></Navigate>
}

export default Logout;