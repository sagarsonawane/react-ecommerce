// src/pages/Home.jsx
import CartContext from "../context/CartContext";
import ProductCard from "../components/ProductCard";
//import { useEffect, useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";

const Home = () => {

    //const [products, setProducts] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const { addToCart } = useCart();

    const {products, loading, error } = useFetchProducts("http://localhost:5231/api/products");

return (
    <>
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) :  error ? (
        <p style={{ color: "red" }}>
          Error fetching products: {error.message}</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
