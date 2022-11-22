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
          Or your money back. We guarantee germination for all seeds!
        </p>
      </article>
      <article className={styles.feature}>
        <MdLocalShipping className={styles.icon} />
        <h3 className={styles.title}>Free Shipping</h3>
        <p className={styles.text}>
          On all orders over $50. Same day shipping on all orders!
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
