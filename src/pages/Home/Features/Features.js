import styles from "./Features.module.scss";
import { MdLocalShipping } from "react-icons/md";
import { FaAward, FaLeaf } from "react-icons/fa";

const Features = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.feature}>
        <FaAward className={styles.icon} />
        <h4 className={styles.title}>Satisfaction Guarantee</h4>
        <p className={styles.text}>
          If you are not 100% satisfied, return any products within 30 days for
          a full refund or exchange.
        </p>
      </article>
      <article className={styles.feature}>
        <MdLocalShipping className={styles.icon} />
        <h4 className={styles.title}>Free Shipping</h4>
        <p className={styles.text}>
          On all orders over $50. All orders placed before 2pm EST are shipped the same day.
        </p>
      </article>
      <article className={styles.feature}>
        <FaLeaf className={styles.icon} />
        <h4 className={styles.title}>Sustainability</h4>
        <p className={styles.text}>
          We pride ourselves on sustainable business practices, including dontaing 5% of profits to environmental causes.
        </p>
      </article>
    </section>
  );
};

export default Features;
