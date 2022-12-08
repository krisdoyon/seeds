import styles from "../Form.module.scss";
import { FormInput, FormSelect } from "../../Form";
import { stateOptions } from "../Inputs/selectOptions";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "../../Checkbox";

export const FormShipping = ({ slice }) => {
  const dispatch = useDispatch();
  const {
    updateShippingSame,
    validateForm,
  } = require(`/src/features/${slice}Slice`);
  const { shippingSame } = useSelector((state) => state[slice]);
  return (
    <div className={styles["form-section"]}>
      <h3 className={styles.heading}>Shipping Address</h3>
      <Checkbox
        className={styles.checkbox}
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
            <FormInput
              slice={slice}
              category="shipping"
              type="text"
              name="shipFirst"
              label="First name"
              required
            />
            <FormInput
              slice={slice}
              category="shipping"
              type="text"
              name="shipLast"
              label="Last name"
              required
            />
          </div>
          <FormInput
            slice={slice}
            category="shipping"
            type="text"
            name="shipAddress1"
            label="Address"
            required
          />
          <FormInput
            slice={slice}
            category="shipping"
            type="text"
            name="shipAddress2"
            label="Apt, suite etc. (optional)"
          />
          <div className={styles["row-3-col"]}>
            <FormInput
              slice={slice}
              category="shipping"
              type="text"
              name="shipCity"
              label="City"
              required
            />
            <FormSelect
              slice={slice}
              label="State"
              category="shipping"
              name="shipState"
              options={stateOptions}
              required
            />
            <FormInput
              slice={slice}
              category="shipping"
              type="text"
              name="shipZip"
              label="ZIP code"
              required
            />
          </div>
        </>
      )}
    </div>
  );
};
