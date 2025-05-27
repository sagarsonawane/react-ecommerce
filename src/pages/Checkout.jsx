//This is a chck out page which will 

import { useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";

function Checkout() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // const [submitted, setSumbmitted] = useState(false);
    //const [shippingInfo, setShippingInfo] = useLocalStorage("shippingInfo", {});

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value, }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //perform basic validation
        if (!form.name || !form.email || !form.phone || !form.address) {
            alert("❌ Please fill in all fields");
            return;
        }

        if(!isValidEmail(form.email)) {
            alert("❌ Please enter a valid email address");
            return;
        }

        if(!isValidPhone(form.phone)) {
            alert("❌ Please enter a valid phone number. It should be 10 digits long.");
            return;
        }

        console.log("Form submitted:", form);
        localStorage.setItem("shippingInfo", JSON.stringify(form));
        window.location.href = "/order-summary";
        // You can also use a state management library like Redux or Context API to manage the form data
        // and pass it to the order summary page.
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "500px" }}>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={{ display: "block", marginBottom: "1rem", width: "100%" }} />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ display: "block", marginBottom: "1rem", width: "100%" }}/>
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} style={{ display: "block", marginBottom: "1rem", width: "100%" }}/>
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={{ display: "block", marginBottom: "1rem", width: "100%" }}/>
                <button type="submit">Place Order</button>
            </form>
        </div>
    )
}

export default Checkout;