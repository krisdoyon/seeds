import styles from "../Form.module.scss";
import { FormInput, FormSelect } from "../../Form";
import { stateOptions } from "../Inputs/selectOptions";

export const FormBilling = ({ slice }) => {
  return (
    <div className={styles["form-section"]}>
      <h3 className={styles.heading}>Billing Address</h3>
      <div className={styles["row-2-col"]}>
        <FormInput
          slice={slice}
          category="billing"
          type="text"
          name="billFirst"
          label="First name"
          required
        />
        <FormInput
          slice={slice}
          category="billing"
          type="text"
          name="billLast"
          label="Last name"
          required
        />
      </div>
      <FormInput
        slice={slice}
        category="billing"
        type="text"
        name="billAddress1"
        label="Address"
        required
      />
      <FormInput
        slice={slice}
        category="billing"
        type="text"
        name="billAddress2"
        label="Apt, suite etc. (optional)"
      />
      <div className={styles["row-3-col"]}>
        <FormInput
          slice={slice}
          category="billing"
          type="text"
          name="billCity"
          label="City"
          required
        />
        <FormSelect
          slice={slice}
          label="State"
          category="billing"
          name="billState"
          options={stateOptions}
          required
        />
        <FormInput
          slice={slice}
          category="billing"
          type="text"
          name="billZip"
          label="ZIP code"
          required
        />
      </div>
    </div>
  );
};
