import styles from "./CheckoutForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, validateForm } from "../../../features/checkoutSlice";

const CheckoutInput = ({ type, id, label, placeholder, category }) => {
  const dispatch = useDispatch();
  const { value, touched, hasError, error } = useSelector(
    (state) => state.checkout[category][id]
  );
  return (
    <div className={styles.wrapper}>
      <input
        className={`${touched && hasError ? styles.invalid : ""}`}
        placeholder={placeholder || label}
        id={id}
        type={type}
        onChange={(e) => {
          dispatch(
            updateForm({ id, category, value: e.target.value, touched: false })
          );
          dispatch(validateForm());
        }}
        value={value}
        name={id}
        onBlur={(e) => {
          dispatch(
            updateForm({ id, category, value: e.target.value, touched: true })
          );
          dispatch(validateForm());
        }}
      />
      <label htmlFor={id}>{label}</label>
      {touched && hasError && (
        <div className={styles["error-msg"]}>{error}</div>
      )}
    </div>
  );
};

export default CheckoutInput;
