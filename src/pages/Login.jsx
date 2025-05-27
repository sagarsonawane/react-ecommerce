import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [Name, setName] = useState("");

    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // Default to home if no previous location

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !Name) {
            alert("Please fill in all fields");
            return;
        }

        // Simulate a login action
        const userData = {
            id: 1,
            name: Name,
            email: email
        };
        dispatch(login(userData));

        navigate(from, { replace: true }); // Redirect to home page after login // or navigate("/checkout") if coming from there
    }



    return (
        <div style={{ padding: "2rem", maxWidth: "400px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} style={{ display: "block", marginBottom: "1rem", width: "100%" }} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", marginBottom: "1rem", width: "100%" }} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

