import styles from "./Popular.module.scss";
import PopularCard from "./PopularCard/PopularCard";
import { popularProducts } from "./popularData";

const Popular = () => {
  return (
    <section>
      <h3 className={styles["heading-secondary"]}>Shop</h3>
      <h2 className={styles["heading-primary"]}>Popular Categories</h2>
      <div className={styles.grid}>
        {popularProducts.map((item, i) => {
          return <PopularCard key={i} {...item} />;
        })}
      </div>
    </section>
  );
};

export default Popular;
