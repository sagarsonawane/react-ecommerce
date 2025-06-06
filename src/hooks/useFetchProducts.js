//custom hook for fetching products from a JSON file
import { useState, useEffect } from "react";

const useFetchProducts = (url) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                alert("Products fetched successfully from " + url);
                console.log("Products fetched successfully");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { products, loading, error };
}

export default useFetchProducts;