import ProductCard from "../components/ProductCard";
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from "../api/product";

const Home = () => {

  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (loading) return <p>Loading Products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
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
