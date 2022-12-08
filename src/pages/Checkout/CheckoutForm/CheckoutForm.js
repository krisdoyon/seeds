import styles from "components/Form/Form.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ACTIONS
import { placeOrder } from "features/ordersSlice";
import { resetForm } from "features/checkoutSlice";
// UTILS
import { generateOrderNumber } from "utils/generateOrderNumber";
import { monthOptions } from "components/Form/Inputs/selectOptions";
// COMPONENTS
import Button from "components/Button";
import {
  Form,
  FormInput,
  FormSelect,
  FormBilling,
  FormShipping,
} from "components/Form";

const CheckoutForm = ({
  isSpinnerShown,
  setIsSubmitted,
  setIsSpinnerShown,
}) => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, promo, shippingCost, tax, total, amount } =
    useSelector((state) => state.cart);
  const { orders, isLoading, error } = useSelector((state) => state.orders);
  const { shippingSame, isFormValid } = useSelector((state) => state.checkout);
  console.log(amount);
  const submitOrder = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
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
      shippingCost,
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
    let orderNumber;
    do {
      orderNumber = generateOrderNumber();
      // eslint-disable-next-line no-loop-func
    } while (orders.some((order) => order.orderNumber === orderNumber));
    const order = {
      orderNumber,
      date: new Date().getTime(),
      displayDate: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(new Date().getTime()),
      amount,
      products: cartItems,
      billing,
      shipping,
      payment,
      shippingSame,
    };
    setIsSpinnerShown(true);
    dispatch(placeOrder(order));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSpinnerShown && !isLoading && error === null) {
        dispatch(resetForm());
        setIsSubmitted(true);
        setIsSpinnerShown(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSpinnerShown, error]);

  return (
    <Form onSubmit={submitOrder}>
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Contact Information</h3>
        <FormInput
          slice="checkout"
          category="contact"
          type="email"
          name="email"
          label="Email Address"
          required
        />
        <FormInput
          slice="checkout"
          category="contact"
          type="text"
          name="phone"
          label="Phone number"
          required
        />
      </div>
      <FormBilling slice={"checkout"} />
      <FormShipping slice={"checkout"} />
      <div className={styles["form-section"]}>
        <h3 className={styles.heading}>Payment Information</h3>
        <div className={styles["row-2-col"]}>
          <FormInput
            slice="checkout"
            category="payment"
            type="text"
            name="payName"
            label="Name on card"
            required
          />
          <FormInput
            slice="checkout"
            category="payment"
            type="text"
            name="payCardNum"
            label="Card number"
            required
          />
        </div>
        <div className={styles["row-3-col"]}>
          <FormSelect
            slice="checkout"
            label="Expiration month"
            category="payment"
            name="payExpMonth"
            options={monthOptions}
            required
          />
          <FormInput
            slice="checkout"
            category="payment"
            type="text"
            name="payExpYear"
            label="Expiration year"
            required
          />
          <FormInput
            slice="checkout"
            category="payment"
            type="text"
            name="payCardCode"
            label="Security code"
            required
          />
        </div>
      </div>

      <Button fill disabled={!isFormValid} className={styles.submit}>
        Submit Order
      </Button>
    </Form>
  );
};

export default CheckoutForm;
