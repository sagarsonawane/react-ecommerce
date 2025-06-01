import { useParams } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
// import { useCart } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProductById } from "../redux/productSlice";
import { useEffect } from "react";

function ProductDetail() {
    const { id } = useParams();
    const {selectedProduct, loading, error } = useSelector(state => state.products);
    //const { products, loading, error } = useFetchProducts("http://localhost:5231/api/products");
    //const { addToCart } = useCart();
    //const  {dispatch} = useCart();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = (product) => {
        console.log('Adding to cart:', product);
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price
        }));
    };

    //const product = products.find((p) => p.id.toString() === id);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if(error) {
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