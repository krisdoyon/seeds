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
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "../../components/OrderSummary";
import { ImSpinner3 } from "react-icons/im";
import Overlay from "../../components/Overlay";
import Modal from "../../components/Modal";
import { loadTestInfo, loadProfileInfo } from "../../features/checkoutSlice";
import { store } from "store";

import Spinner from "../../components/Spinner/Spinner";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, isLoading: isFetching } = cart;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSpinnerShown, setIsSpinnerShown] = useState(false);
  const { currentOrder } = useSelector((state) => state.orders);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state);

  useEffect(() => {
    if (
      cartItems.length === 0 &&
      !isSpinnerShown &&
      !isSubmitted &&
      !isFetching
    ) {
      navigate("/cart");
    }
  }, [cartItems, isSubmitted, isSpinnerShown, navigate, isFetching]);

  useEffect(() => {
    if (!isSpinnerShown) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [isSpinnerShown]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <section className={styles.wrapper}>
      {!isSubmitted && (
        <>
          <Breadcrumb title="checkout" />
          <div className={styles["btn-container"]}>
            <Button fill to="/cart" className={styles["btn-back"]}>
              back to cart
            </Button>
            {!isLoggedIn && (
              <Button
                fill
                className={styles["btn-back"]}
                onClick={() => dispatch(loadTestInfo())}
              >
                Load Test Info
              </Button>
            )}
            {isLoggedIn && (
              <Button
                fill
                className={styles["btn-back"]}
                onClick={() => dispatch(loadProfileInfo(account))}
              >
                Load Profile Info
              </Button>
            )}
          </div>
          {!isLoggedIn && (
            <div className={styles["login-container"]}>
              <p>Already have an account?</p>
              <Button to="/login" className={styles["text-btn"]}>
                Log in
              </Button>
            </div>
          )}
          <div className={styles.content}>
            <div>
              <h2 className={styles.heading}>Checkout</h2>
              <CheckoutForm
                setIsSubmitted={setIsSubmitted}
                setIsSpinnerShown={setIsSpinnerShown}
                isSpinnerShown={isSpinnerShown}
              />
            </div>
            <div className={styles["summary-wrapper"]}>
              <CartSummary {...cart} />
              <CartPromo />
              <CheckoutItems />
            </div>
          </div>
        </>
      )}
      {isSpinnerShown && (
        <>
          <Overlay className={styles.overlay} />
          <Modal className={styles.modal}>
            <ImSpinner3 className={styles["order-spinner"]} />
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
