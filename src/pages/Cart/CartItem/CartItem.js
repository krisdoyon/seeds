import styles from "./CartItem.module.scss";
import sharedStyles from "../Cart.module.scss";
import { useDispatch } from "react-redux";
import { removeItem, toggleAmount } from "../../../features/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
import { OnSaleTag } from "../../../components/Tags/Tags";
import Button from "../../../components/Button";

const CartItem = ({
  id,
  title,
  quantity,
  salePrice,
  price,
  inStock,
  category,
}) => {
  const dispatch = useDispatch();
  return (
    <article className={`${styles.item} ${sharedStyles.grid}`}>
      <div className={styles["title-wrapper"]}>
        <img className={styles.img} src={`/img/${id}.webp`} alt={title} />
        <div className={styles["title-info-wrapper"]}>
          <Link to={`/shop/${category}/${id}`} className={styles.title}>
            {title}
          </Link>
          {inStock > 5 && (
            <p className={styles["in-stock"]}>{`${inStock} available`}</p>
          )}
          {inStock <= 5 && (
            <p
              className={`${styles["in-stock"]} ${styles["low-stock"]}`}
            >{`Only ${inStock} left!`}</p>
          )}
        </div>
      </div>
      <div className={styles["price-wrapper"]}>
        <p className={styles.price}>{`${formatPrice(price)} each`}</p>
        {salePrice && <OnSaleTag />}
      </div>
      <div className={styles["toggle-wrapper"]}>
        <Button
          className={styles["btn-toggle"]}
          onClick={() => dispatch(toggleAmount({ action: "increase", id }))}
        >
          <FaChevronUp className={styles["toggle-icon"]} />
        </Button>
        <p className={styles.quantity}>{quantity}</p>
        <Button
          className={styles["btn-toggle"]}
          onClick={() => dispatch(toggleAmount({ action: "decrease", id }))}
        >
          <FaChevronDown className={styles["toggle-icon"]} />
        </Button>
      </div>

      <p className={styles.subtotal}>{formatPrice(price * quantity)}</p>

      <Button
        className={styles["btn-remove"]}
        onClick={() => dispatch(removeItem(id))}
        fill
      >
        X
      </Button>
    </article>
  );
};

export default CartItem;
