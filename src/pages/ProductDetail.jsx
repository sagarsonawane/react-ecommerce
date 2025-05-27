import { useParams } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
// import { useCart } from "../context/CartContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetail() {
    const { id } = useParams();
    const { products, loading, error } = useFetchProducts("/products.json");
    //const { addToCart } = useCart();
    //const  {dispatch} = useCart();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        console.log('Adding to cart:', product);
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price
        }));
    };

    const product = products.find((p) => p.id.toString() === id);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if(error) {
        return <p style={{ color: "red" }}>Error fetching product: {error.message}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }


    return (
        <div style={{ padding: "2rem" }}>
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Description: This is a fantastic product!</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
    );
}

export default ProductDetail;