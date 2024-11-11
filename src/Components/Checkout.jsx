import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.jsx";
import ErrorComp from "./ErrorComp.jsx";

const requestconfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    error,
    data,
    isLoading: isSending,
    handleRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestconfig);

  const totalAmount = cartCtx.items.reduce((total, item) => {
    return (total += item.quantity * item.price);
  }, 0);

  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
  };

  function handleFinish() {
    cartCtx.clearCart();
    clearData();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    handleRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  };

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onclose={handleCloseCheckout}
      >
        <h2>Your Order Placed</h2>
        <p>Your Delivery hero Will Deliver your Order Soon</p>

        <div className="modal-actions">
          <Button
            onClick={() => {
              handleCloseCheckout();
              handleFinish();
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onclose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalAmount)}</p>
        <Input id={"name"} label={"Full Name"} type={"text"} required />
        <Input id={"email"} label={"E-Mail Address"} type="email" required />
        <Input id={"street"} label={"Street"} type="text" required />
        <div className="control-row">
          <Input
            label={"Postal Code"}
            type={"text"}
            id={"postal-code"}
            required
          />
          <Input label={"City"} type={"text"} id={"city"} required />
        </div>

        {error && (
          <ErrorComp title={"Faild to Send Your Order"} message={error} />
        )}
        {!isSending ? (
          <p className="modal-control">
            <Button textOnly type="button" onClick={handleCloseCheckout}>
              Close
            </Button>
            <Button>Start Order</Button>
          </p>
        ) : (
          <p className="modal-control">Placing Your Order Please Wait...</p>
        )}
      </form>
    </Modal>
  );
}
