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
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>
          Error fetching products: {error.message}</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
