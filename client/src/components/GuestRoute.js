const { AuthContext } = require("contexts/AuthContext");
const { useContext } = require("react");
const { Navigate } = require("react-router-dom");

const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to='/' />;
    }

    return children;
};

export default GuestRoute;