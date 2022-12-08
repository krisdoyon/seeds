import styles from "./Account.module.scss";
import formStyles from "components/Form/Form.module.scss";

import Breadcrumb from "../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormInput, FormShipping, FormBilling } from "components/Form";
import Button from "components/Button";

import { sendProfileUpdate } from "../../features/accountSlice";
import Spinner from "../../components/Spinner";

const Account = () => {
  const dispatch = useDispatch();
  const { contact, isFormValid, isLoading, shippingSame } = useSelector(
    (state) => state.account
  );
  const { email } = contact;
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const updates = {
      contact: {
        email: email.value,
        phone: formData.phone,
      },
      billing: {
        billFirst: formData.billFirst,
        billLast: formData.billLast,
        billAddress1: formData.billAddress1,
        billAddress2: formData.billAddress2,
        billCity: formData.billCity,
        billState: formData.billState,
        billZip: formData.billZip,
      },
      ...(!shippingSame && {
        shipping: {
          shipFirst: formData.shipFirst,
          shipLast: formData.shipLast,
          shipAddress1: formData.shipAddress1,
          shipAddress2: formData.shipAddress2,
          shipCity: formData.shipCity,
          shipState: formData.shipState,
          shipZip: formData.shipZip,
        },
      }),
      shippingSame,
    };
    dispatch(sendProfileUpdate(updates));
  };

  return (
    <section>
      <Breadcrumb title="account" />
      <div className={styles.container}>
        <h2>Welcome back!</h2>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Form onSubmit={handleUpdate} className={styles.form}>
            <div className={formStyles["form-section"]}>
              <h3 className={styles.subheading}>Update your profile:</h3>
              <div>
                <p>
                  <strong>Email Address:</strong> {email.value}
                </p>
              </div>
              <FormInput
                slice="account"
                category="contact"
                type="text"
                name="phone"
                label="Phone number"
                required
              />
            </div>
            <FormBilling slice="account" />
            <FormShipping slice="account" />
            <Button fill disabled={!isFormValid} className={formStyles.submit}>
              Update
            </Button>
          </Form>
        )}
      </div>
    </section>
  );
};

export default Account;
