import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef, useEffect } from "react";

function RequireAuth({ children }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const location = useLocation();
    const toastShown = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !toastShown.current) {
            toast.error("Please login to access this page", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            toastShown.current = true;
        }
    }, [isAuthenticated]);

    // Redirect to the login page and pass the current location in state
    if (!isAuthenticated)
        return <Navigate to="/login" replace state={{ from: location }} />;

    // If authenticated, render the children components
    return children;
}

export default RequireAuth;