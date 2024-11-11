import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatter.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + +item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function forwordToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onclose={
        userProgressCtx.progress === "cart"
          ? () => userProgressCtx.hideCart()
          : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={forwordToCheckout}>Go To Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
