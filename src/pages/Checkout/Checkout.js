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
  const { cartItems } = useSelector((state) => state.cart);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (isSubmitted === false && cartItems.length === 0) {
  //     navigate("/cart");
  //   }
  // }, [cartItems]);

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
          <Breadcrumb title="checkout" cart />
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
              <CartSummary />
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
          <h2 className={styles.heading}>Thanks for your order!</h2>
          <OrderSummary />
        </>
      )}
    </section>
  );
};

export default Checkout;
