import React from "react";
import styles from "./Tags.module.scss";

export const OnSaleTag = () => {
  return (
    <div className={`${styles.tag} ${styles["on-sale"]} ${styles.className}`}>
      on sale
    </div>
  );
};

export const LowStockTag = () => {
  return (
    <div className={`${styles.tag} ${styles["low-stock"]}`}>low stock</div>
  );
};

export const SoldOutTag = () => {
  return <div className={`${styles.tag} ${styles["sold-out"]}`}>sold out</div>;
};

export const NewTag = ({ className }) => {
  return <div className={`${styles.new} ${className}`}>new</div>;
};
