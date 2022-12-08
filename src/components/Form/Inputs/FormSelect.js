import styles from "./FormInput.module.scss";
import { useDispatch, useSelector } from "react-redux";

export const FormSelect = ({ slice, name, category, options, label }) => {
  const { updateForm, validateForm } = require(`/src/features/${slice}Slice`);
  const dispatch = useDispatch();
  const { value, touched, hasError, error } = useSelector(
    (state) => state[slice][category][name]
  );
  return (
    <div className={styles.wrapper}>
      <select
        className={`${touched && hasError ? styles.invalid : ""}`}
        name={name}
        value={value}
        onChange={(e) => {
          dispatch(
            updateForm({
              name,
              category,
              value: e.target.value,
              touched: false,
            }),
            validateForm()
          );
          dispatch(validateForm());
        }}
        onBlur={(e) => {
          dispatch(
            updateForm({
              name,
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
      <label htmlFor={name}>{label}</label>
      {touched && hasError && (
        <div className={styles["error-msg"]}>{error}</div>
      )}
    </div>
  );
};
