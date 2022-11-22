import styles from "./CartPreviewItem.module.scss";
import buttons from "../../../../components/Button/Button.module.scss";
import { useDispatch } from "react-redux";

import { OnSaleTag } from "../../../../components/Tags";
import { formatPrice } from "../../../../utils/formatPrice";
import { removeItem, toggleAmount } from "../../../../features/cartSlice";

import QuantityBtns from "../../../../components/QuantityBtns";

const CartPreviewItem = ({
  id,
  title,
  category,
  quantity,
  price,
  salePrice,
  inStock,
}) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(toggleAmount({ action: "increase", id }));
  };

  const handleDecrease = () => {
    dispatch(toggleAmount({ action: "decrease", id }));
  };

  return (
    <article className={styles.item}>
      <img className={styles.img} src={`/img/${id}.webp`} alt={title} />
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {salePrice && <OnSaleTag />}
      </header>

      <div className={styles.content}>
        <div className={styles.info}>
          <p>{formatPrice(salePrice || price)} / ea.</p>
          <button
            className={`${buttons.btn} ${styles["btn-remove"]}`}
            onClick={() => dispatch(removeItem(id))}
          >
            Remove
          </button>
        </div>
        <QuantityBtns
          className={styles["qty-btns"]}
          quantity={quantity}
          inStock={inStock}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      </div>
    </article>
  );
};

export default CartPreviewItem;
