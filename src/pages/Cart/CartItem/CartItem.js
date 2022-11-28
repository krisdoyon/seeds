import styles from "./CartItem.module.scss";
import sharedStyles from "../Cart.module.scss";
import { useDispatch } from "react-redux";
import { toggleAmount } from "../../../features/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
import { OnSaleTag } from "../../../components/Tags/Tags";
import Button from "../../../components/Button";
import { openModal } from "../../../features/modalSlice";

const CartItem = ({
  id,
  title,
  quantity,
  salePrice,
  price,
  inStock,
  category,
  imgURL,
  linkURL,
}) => {
  const dispatch = useDispatch();
  return (
    <article className={`${styles.item} ${sharedStyles.grid}`}>
      <div className={styles["title-wrapper"]}>
        <img className={styles.img} src={imgURL} alt={title} />
        <div className={styles["title-info-wrapper"]}>
          <Link to={linkURL} className={styles.title}>
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
        <p className={styles.price}>{`${formatPrice(
          salePrice || price
        )} each`}</p>
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

      <p className={styles.subtotal}>
        {formatPrice((salePrice || price) * quantity)}
      </p>

      <Button
        className={styles["btn-remove"]}
        onClick={() =>
          dispatch(
            openModal({
              type: "confirm",
              action: "remove",
              page: "cart",
              id,
              title,
            })
          )
        }
        fill
      >
        X
      </Button>
    </article>
  );
};

export default CartItem;
