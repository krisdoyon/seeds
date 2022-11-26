import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import CheckoutInput from "./CheckoutInput";
import CheckoutSelect from "./CheckoutSelect";
import styles from "./CheckoutForm.module.scss";
import { addOrder } from "../../../features/ordersSlice";
import { clearCart } from "../../../features/cartSlice";
import Checkbox from "../../../components/Checkbox";
import {
  updateShippingSame,
  validateForm,
} from "../../../features/checkoutSlice";
import { stateOptions, monthOptions } from "./CheckoutSelectOptions";

const CheckoutForm = () => {
  const { cartItems, subtotal, promo, shipping, tax, total } = useSelector(
    (state) => state.cart
  );
  const { shippingSame, isFormValid } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const placeOrder = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);

    // const products = cartItems.map(item => {
    //   return {

    //   }
    // })

    const billing = {
      first: data.billFirst,
      last: data.billLast,
      address1: data.billAddress1,
      address2: data.billAddress2,
      city: data.billCity,
      state: data.billState,
      zip: data.billZip,
    };

    const shipping = shippingSame
      ? billing
      : {
          first: data.shipFirst,
          last: data.shipLast,
          address1: data.shipAddress1,
          address2: data.shipAddress2,
          city: data.shipCity,
          state: data.shipState,
          zip: data.shipZip,
        };

    const payment = {
      subtotal,
      shipping,
      tax,
      total,
      ...(promo.code !== null && { promo }),
      card: {
        name: data.payName,
        number: data.payCardNum,
        code: data.payCardCode,
        expMonth: data.payExpMonth,
        expYear: data.payExpYear,
      },
    };
    dispatch(addOrder({ products: cartItems, payment, billing, shipping }));
    // dispatch(clearCart());
  };

  return (
    <form className={styles.form} onSubmit={placeOrder}>
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Contact Information</h3>
        <CheckoutInput
          category="contact"
          type="email"
          id="email"
          label="Email Address"
          required
        />
        <CheckoutInput
          category="contact"
          type="text"
          id="phone"
          label="Phone number"
          required
        />
      </div>
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Billing Address</h3>
        <div className={styles["row-2-col"]}>
          <CheckoutInput
            category="billing"
            type="text"
            id="billFirst"
            label="First name"
            required
          />
          <CheckoutInput
            category="billing"
            type="text"
            id="billLast"
            label="Last name"
            required
          />
        </div>
        <CheckoutInput
          category="billing"
          type="text"
          id="billAddress1"
          label="Address"
          required
        />
        <CheckoutInput
          category="billing"
          type="text"
          id="billAddress2"
          label="Apt, suite etc. (optional)"
        />
        <div className={styles["row-3-col"]}>
          <CheckoutInput
            category="billing"
            type="text"
            id="billCity"
            label="City"
            required
          />
          <CheckoutSelect
            label="State"
            category="billing"
            id="billState"
            options={stateOptions}
            required
          />
          <CheckoutInput
            category="billing"
            type="text"
            id="billZip"
            label="ZIP code"
            required
          />
        </div>
      </div>
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Shipping Address</h3>
        <Checkbox
          label="Same as billing address"
          checked={shippingSame}
          onChange={() => {
            dispatch(updateShippingSame());
            dispatch(validateForm());
          }}
        />
        {!shippingSame && (
          <>
            <div className={styles["row-2-col"]}>
              <CheckoutInput
                category="shipping"
                type="text"
                id="shipFirst"
                label="First name"
                required
              />
              <CheckoutInput
                category="shipping"
                type="text"
                id="shipLast"
                label="Last name"
                required
              />
            </div>
            <CheckoutInput
              category="shipping"
              type="text"
              id="shipAddress1"
              label="Address"
              required
            />
            <CheckoutInput
              category="shipping"
              type="text"
              id="shipAddress2"
              label="Apt, suite etc. (optional)"
            />
            <div className={styles["row-3-col"]}>
              <CheckoutInput
                category="shipping"
                type="text"
                id="shipCity"
                label="City"
                required
              />
              <CheckoutSelect
                label="State"
                category="shipping"
                id="shipState"
                options={stateOptions}
                required
              />
              <CheckoutInput
                category="shipping"
                type="text"
                id="shipZip"
                label="ZIP code"
                required
              />
            </div>
          </>
        )}
      </div>
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Payment Information</h3>
        <div className={styles["row-2-col"]}>
          <CheckoutInput
            category="payment"
            type="text"
            id="payName"
            label="Name on card"
            required
          />
          <CheckoutInput
            category="payment"
            type="text"
            id="payCardNum"
            label="Card number"
            required
          />
        </div>
        <div className={styles["row-3-col"]}>
          <CheckoutSelect
            label="Expiration month"
            category="payment"
            id="payExpMonth"
            options={monthOptions}
            required
          />
          <CheckoutInput
            category="payment"
            type="text"
            id="payExpYear"
            label="Expiration year"
            required
          />

          <CheckoutInput
            category="payment"
            type="text"
            id="payCardCode"
            label="Security code"
            required
          />
        </div>
      </div>

      <Button fill disabled={!isFormValid}>
        Submit Order
      </Button>
    </form>
  );
};

export default CheckoutForm;