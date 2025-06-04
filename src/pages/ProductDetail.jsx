import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/product";

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // const fetchProductById = async (id) => {
    //     const response = await axios.get(`http://localhost:5231/api/products/${id}`);
    //     return response.data;
    // };

    const {data: selectedProduct, isLoading: loading, error} = useQuery({
        queryKey: ["product", id],
        queryFn: ()=> fetchProductById(id),
    });

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error fetching product: {error.message}</p>;
    }

    if (!selectedProduct) {
        return <p>Product not found</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{selectedProduct.name}</h2>
            <p>Price: ₹{selectedProduct.price}</p>
            <p>Description: {selectedProduct.description}</p>
            <button onClick={() => dispatch(addToCart(selectedProduct))}>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;