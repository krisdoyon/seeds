import styles from "./NewArrivals.module.scss";
import { useSelector } from "react-redux";
import NewArrivalItem from "./NewArrivalItem/NewArrivalItem";

const NewArrivals = () => {
  const { newProducts, isLoading } = useSelector((state) => state.products);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>New Arrivals</h2>
      <div className={styles["items-wrapper"]}>
        <div className={styles.items}>
          {!isLoading &&
            newProducts.map((product) => {
              return <NewArrivalItem key={product.id} {...product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
