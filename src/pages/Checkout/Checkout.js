import styles from "./Checkout.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CartSummary from "../Cart/CartSummary";
import CartPromo from "../Cart/CartPromo";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const Checkout = () => {
  return (
    <section className="container">
      <Button to="/cart" className={styles["btn-back"]} fill>
        back to cart
      </Button>
      <Breadcrumb title="checkout" cart />
      <h2 className={styles.heading}>Checkout</h2>
      <div className={styles.content}>
        <CheckoutForm />
        <div>
          <CartPromo />
          <CartSummary />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
