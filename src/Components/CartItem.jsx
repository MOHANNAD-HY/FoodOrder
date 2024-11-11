import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import CartContext from "../store/CartContext";

export default function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  const handleAddingItem = () => {
    cartCtx.addItem(item);
  };

  const handleRemoveItem = () => {
    cartCtx.removeItem(item.id);
    
  };

  return (
    <li className="cart-item">
      <p>
        {item.name} - {`${item.quantity} pieces `} X
        {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={handleRemoveItem}>-</button>
        <button>{item.quantity}</button>
        <button onClick={handleAddingItem}>+</button>
      </p>
    </li>
  );
}
