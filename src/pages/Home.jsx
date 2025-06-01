import { useEffect } from 'react';
// src/pages/Home.jsx
import CartContext from "../context/CartContext";
import ProductCard from "../components/ProductCard";
//import { useEffect, useState } from "react";
//import useFetchProducts from "../hooks/useFetchProducts";
import { fetchProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    //const [products, setProducts] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const { addToCart } = useCart();

    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    //const {products, loading, error } = useFetchProducts("http://localhost:5231/api/products");

    if(loading) return <p>Loading Products...</p>; 
    if(error) return <p>Error: {error}</p>;

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
