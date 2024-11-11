import { useContext } from "react";

import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  const cartContent = cartCtx.items.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="application logo" />
          <h1>Mohannad Resturant</h1>
        </div>

        <Button textOnly={true} onClick={handleShowCart}>
          Cart({cartContent})
        </Button>
      </header>
    </>
  );
}
