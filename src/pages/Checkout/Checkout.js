import { useState } from "react";
import styles from "./Checkout.module.scss";
import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CartSummary from "../Cart/CartSummary";
import CartPromo from "../Cart/CartPromo";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import CheckoutItems from "./CheckoutItems/CheckoutItems";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/OrderSummary";
import { ImSpinner3 } from "react-icons/im";
import Overlay from "../../components/Overlay";
import Modal from "../../components/Modal";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentOrder } = useSelector((state) => state.orders);

  useEffect(() => {
    if (cartItems.length === 0 && !isLoading && !isSubmitted) {
      navigate("/cart");
    }
  }, [cartItems, isSubmitted, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [isLoading]);

  return (
    <section className={`container ${styles.wrapper}`}>
      {!isSubmitted && (
        <>
          <Breadcrumb title="checkout" />
          <Button to="/cart" className={styles["btn-back"]} fill>
            back to cart
          </Button>
          <div className={styles.content}>
            <div>
              <h2 className={styles.heading}>Checkout</h2>
              <CheckoutForm
                setIsSubmitted={setIsSubmitted}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className={styles["flex-wrapper"]}>
              <CartSummary {...cart} />
              <CartPromo />
              <CheckoutItems />
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <>
          <Overlay className={styles.overlay} />
          <Modal className={styles.modal}>
            <ImSpinner3 className={styles.spinner} />
            <p>Processing Order...</p>
          </Modal>
        </>
      )}
      {isSubmitted && (
        <>
          <header>
            <h2>Thanks for your order!</h2>
            <p
              className={styles["order-number"]}
            >{`Order #${currentOrder?.orderNumber}`}</p>
          </header>
          <OrderSummary />
        </>
      )}
    </section>
  );
};

export default Checkout;
