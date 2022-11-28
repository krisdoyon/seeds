import styles from "./CheckoutForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, validateForm } from "../../../features/checkoutSlice";

const CheckoutSelect = ({ id, category, options, label }) => {
  const dispatch = useDispatch();
  const { value, touched, hasError, error } = useSelector(
    (state) => state.checkout[category][id]
  );
  return (
    <div className={styles.wrapper}>
      <select
        className={`${touched && hasError ? styles.invalid : ""}`}
        id={id}
        name={id}
        value={value}
        onChange={(e) => {
          dispatch(
            updateForm({ id, category, value: e.target.value, touched: false }),
            validateForm()
          );
          dispatch(validateForm());
        }}
        onBlur={(e) => {
          dispatch(
            updateForm({
              id,
              category,
              value: e.target.value,
              touched: true,
            })
          );
          dispatch(validateForm());
        }}
        required
      >
        {options.map((option) => option)}
      </select>
      <label htmlFor={id}>{label}</label>
      {touched && hasError && (
        <div className={styles["error-msg"]}>{error}</div>
      )}
    </div>
  );
};

export default CheckoutSelect;
