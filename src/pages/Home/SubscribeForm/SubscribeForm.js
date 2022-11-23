import styles from "./SubscribeForm.module.scss";
import { useState } from "react";
import Button from "../../../components/Button";

const SubscribeForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className={styles.wrapper}>
      <h3>Subscribe</h3>
      <h2>Keep in touch</h2>
      <p className={styles.text}>
        Sign up for our newsletter and be the first to know about coupons and
        special promotions!
      </p>
      <form onSubmit={handleSubmit}>
        {!isSubmitted && (
          <>
            <input type="email" placeholder="youremail@example.com" required />
            <Button fill>Subscribe</Button>
          </>
        )}
        {isSubmitted && (
          <p className={styles.submitted}>Thanks for subscribing!</p>
        )}
      </form>
    </section>
  );
};

export default SubscribeForm;
