import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated && user.role !== 'admin') {
        return <Navigate to='/' />
    } else if (!isAuthenticated) {
        return <Navigate to='/users/login' />
    }

    return children;
};

export default AdminRoute;