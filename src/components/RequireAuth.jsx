import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to the login page and pass the current location in state
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If authenticated, render the children components
    return children;
}

export default RequireAuth;