const { AuthContext } = require("contexts/AuthContext");
const { useContext } = require("react");
const { Navigate } = require("react-router-dom");

const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to='/users/login' />;
    }

    return children;
};

export default AuthRoute;