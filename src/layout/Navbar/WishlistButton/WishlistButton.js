import styles from "./WishlistButton.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

const WishlistButton = () => {
  const { amount } = useSelector((state) => state.products.wishlist);

  return (
    <Link to="/wishlist" className={styles.wrapper}>
      <FaRegHeart className={styles.icon} />
      <div className={styles.amount}>{amount}</div>
    </Link>
  );
};

export default WishlistButton;
