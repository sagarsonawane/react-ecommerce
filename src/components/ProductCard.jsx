import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductCard({name, price, id}) {
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
        console.log('Adding to cart:', { id, name, price });
        dispatch(addToCart({ id, name, price }));
    };

    return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {/* <button onClick={()=>handleAddToCart(id, name, price)}>Add to Cart</button> */}
      {/* <button onClick={() => addToCart({id, name, price})}>Add to Cart</button> */}
      <br/>
      <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'blue' }}>
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;