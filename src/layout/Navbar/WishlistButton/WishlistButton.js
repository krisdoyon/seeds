import styles from "./WishlistButton.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

const WishlistButton = () => {
  const { wishlistAmount } = useSelector((state) => state.wishlist);

  return (
    <Link to="/wishlist" className={styles.wrapper}>
      <FaRegHeart className={styles.icon} />
      <div className={styles.amount}>{wishlistAmount}</div>
    </Link>
  );
};

export default WishlistButton;
