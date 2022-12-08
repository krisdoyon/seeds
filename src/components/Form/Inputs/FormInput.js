import styles from "./FormInput.module.scss";
import { useDispatch, useSelector } from "react-redux";

export const FormInput = ({ slice, type, name, label, category, ...props }) => {
  const { updateForm, validateForm } = require(`/src/features/${slice}Slice`);
  const dispatch = useDispatch();
  const { value, touched, hasError, error } = useSelector(
    (state) => state[slice][category][name]
  );
  return (
    <div className={styles.wrapper}>
      <input
        className={`${touched && hasError ? styles.invalid : ""}`}
        placeholder={props.placeholder || label}
        type={type}
        onChange={(e) => {
          dispatch(
            updateForm({
              name,
              category,
              value: e.target.value,
              touched: false,
            })
          );
          dispatch(validateForm());
        }}
        value={value}
        name={name}
        onBlur={(e) => {
          dispatch(
            updateForm({ name, category, value: e.target.value, touched: true })
          );
          dispatch(validateForm());
        }}
      />
      <label htmlFor={name}>{label}</label>
      {touched && hasError && (
        <div className={styles["error-msg"]}>{error}</div>
      )}
    </div>
  );
};
