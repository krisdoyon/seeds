import styles from "./NewArrivals.module.scss";
import { useSelector } from "react-redux";
import NewArrivalItem from "./NewArrivalItem/NewArrivalItem";
import Button from "../../../components/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

const NewArrivals = () => {
  const { newProducts, isLoading } = useSelector((state) => state.products);
  const containerRef = useRef();
  const itemsRef = useRef();

  const scroll = (direction) => {
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const itemsLeft = itemsRef.current.getBoundingClientRect().left;
    const scrollAmount = direction === "right" ? 300 : -300;
    containerRef.current.scrollTo({
      left: containerLeft - itemsLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>New Arrivals</h2>
      <div className={styles.container}>
        <Button
          fill
          className={styles["btn-left"]}
          onClick={() => scroll("left")}
        >
          <FaChevronLeft className={styles.icon} />
        </Button>
        <div className={styles["items-wrapper"]} ref={containerRef}>
          <div className={styles.items} ref={itemsRef}>
            {!isLoading &&
              newProducts.map((product) => {
                return <NewArrivalItem key={product.id} {...product} />;
              })}
          </div>
        </div>
        <Button
          fill
          className={styles["btn-right"]}
          onClick={() => scroll("right")}
        >
          <FaChevronRight className={styles.icon} />
        </Button>
      </div>
    </section>
  );
};

export default NewArrivals;
