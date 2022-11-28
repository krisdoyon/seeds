import styles from "./Breadcrumb.module.scss";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, category, product, orders }) => {
  return (
    <div className={styles.breadcrumb}>
      <Link to="/">Home</Link>
      <span> / </span>
      {(category || product) && (
        <>
          <Link to="/shop">Shop</Link>
          <span> / </span>
        </>
      )}
      {product && (
        <>
          <Link to={`/shop/${category}`}>{category}</Link>
          <span> / </span>
        </>
      )}
      {orders && (
        <>
          <Link to={`/orders`}>orders</Link>
          <span> / </span>
        </>
      )}
      <span className={styles.title}> {title}</span>
    </div>
  );
};

export default Breadcrumb;
