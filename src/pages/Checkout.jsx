//This is a check out page which will 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../App.css"

function Checkout() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const navigate = useNavigate();
    // const [submitted, setSumbmitted] = useState(false);
    //const [shippingInfo, setShippingInfo] = useLocalStorage("shippingInfo", {});
    const cartItems = useSelector((state) => state.cart); // Get cart items from Redux

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);

    const [touched, setTouch] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value, }));

        //basic real time validation
        if (touched[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: value.trim() === "" }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouch((prevTouch) => ({ ...prevTouch, [name]: true }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: value.trim() === "" }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        //perform basic validation
        if (!form.name || !form.email || !form.phone || !form.address) {
            //alert("❌ Please fill in all fields");
            toast.error("❌ Please fill in all fields", { position: "top-center", theme: "dark" });
            return;
        }

        if (!isValidEmail(form.email)) {
            alert("❌ Please enter a valid email address");
            return;
        }

        if (!isValidPhone(form.phone)) {
            alert("❌ Please enter a valid phone number. It should be 10 digits long.");
            return;
        }

        const orderData = {
            customerName: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            items: cartItems
        };

        navigate("/order-summary", { state: { order: orderData } });

        console.log("Form submitted:", form);
        //localStorage.setItem("shippingInfo", JSON.stringify(form));
        //window.location.href = "/order-summary";
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "500px" }}>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" value={form.name} 
                onChange={handleChange} 
                onBlur={handleBlur}
                style={{ display: "block", marginBottom: "1rem", width: "100%" }} 
                required minLength={3} className={touched.name && errors.name ? "input-error" : ""}/>
                    {touched.name && errors.name && (<p className="error-message">Name is required</p>)}
                <input name="email" type="email" placeholder="Email" value={form.email} 
                onChange={handleChange} onBlur={handleBlur}
                style={{ display: "block", marginBottom: "1rem", width: "100%" }}
                 required className={touched.name && errors.name? "input-error" : ""}/>
                    {touched.email && errors.email && (<p className="error-message">Email is required</p>)}
                <input name="phone" placeholder="Phone" value={form.phone} 
                    onChange={handleChange} onBlur={handleBlur}
                    style={{ display: "block", marginBottom: "1rem", width: "100%" }}  
                    pattern="[6-9][0-9]{9}" required className={touched.name && errors.name? "input-error" : ""}/>
                    {touched.phone && errors.phone && (<p className="error-message">Phone is required</p>)}
                <input name="address" placeholder="Address" value={form.address} 
                onChange={handleChange} onBlur={handleBlur}
                style={{ display: "block", marginBottom: "1rem", width: "100%" }}
                 required className={touched.name && errors.name? "input-error" : ""}/>
                    {touched.address && errors.address && (<p className="error-message">Address is required</p>)}
                <button type="submit">Place Order</button>
            </form>
        </div>
    )
}

export default Checkout;