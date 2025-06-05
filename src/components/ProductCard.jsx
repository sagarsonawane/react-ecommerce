import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

function ProductCard({ name, price, id }) {
  //const { dispatch } = useCart();

  //const product = { name, price };

  // const handleAddToCart = (product) => {
  //     console.log('Adding to cart:', product);
  //     dispatch({ type: 'ADD_TO_CART', payload: {
  //   id,         // ensure this exists
  //   name,
  //   price
  // } });
  // };

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    //console.log('Adding to cart:', { id, name, price });
    toast.success("Added to cart", {
      position: "top-right",
      theme: "colored",
      transition: "Bounce",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(addToCart({ id, name, price }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">Price: ₹{price}</p>
      <div className="mt-auto space-y-2">
        <button onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add to Cart</button>
        {/* <button onClick={()=>handleAddToCart(id, name, price)}>Add to Cart</button> */}
        {/* <button onClick={() => addToCart({id, name, price})}>Add to Cart</button> */}
        <br />
        <Link to={`/products/${id}`}
          className="block text-center text-sm text-blue-600 underline">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;