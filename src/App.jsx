import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import Cart from "./Components/Cart.jsx";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Checkout from "./Components/Checkout.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />

        <Meals />

        <Cart />

        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
