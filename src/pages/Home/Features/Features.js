import styles from "./Features.module.scss";
import { MdLocalShipping } from "react-icons/md";
import { FaAward } from "react-icons/fa";

const Features = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.feature}>
        <FaAward className={styles.icon} />
        <h3 className={styles.title}>Satisfaction Guarantee</h3>
        <p className={styles.text}>
          If you are not 100% satisfied, return any products within 30 days for a full refund or exchange.
        </p>
      </article>
      <article className={styles.feature}>
        <MdLocalShipping className={styles.icon} />
        <h3 className={styles.title}>Free Shipping</h3>
        <p className={styles.text}>
          On all orders over $50. Orders placed before 2pm ship the same day!
        </p>
      </article>
      <article className={styles.feature}>
        <MdLocalShipping className={styles.icon} />
        <h3 className={styles.title}>Free Shipping</h3>
        <p className={styles.text}>
          On all orders over $50. Same day shipping on all orders!
        </p>
      </article>
    </section>
  );
};

export default Features;
