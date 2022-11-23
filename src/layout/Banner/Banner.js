import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateFilters } from "../../features/productsSlice";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const messages = [
    <span>Free shipping on orders $50+</span>,
    <span>
      Save up to <strong>40%</strong> on select sale items.{" "}
      <Link
        className={styles["message--bold"]}
        to="/shop"
        onClick={() =>
          dispatch(updateFilters({ filter: "onSale", value: true }))
        }
      >
        shop now
      </Link>
    </span>,
    <span>
      Get 10% off your order with promo code{" "}
      <strong className={styles["message--bold"]}>save10</strong>
    </span>,
  ];

  useEffect(() => {
    if (index > messages.length - 1) setIndex(0);
  }, [index, messages.length]);

  useEffect(() => {
    const timeout = setTimeout(() => setIndex(index + 1), 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <div className={styles.banner}>
      {messages.map((message, i) => (
        <p
          key={i}
          className={`${styles.message} ${
            index === i ? styles["message--active"] : ""
          }`}
        >
          {message}
        </p>
      ))}
    </div>
  );
};

export default Banner;
