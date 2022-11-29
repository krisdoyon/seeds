import { useState } from "react";
import styles from "./CartPromo.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { addPromo, removePromo } from "../../../features/cartSlice";
import { promoCodes } from "../../../assets/promo";
import { FaTag, FaExclamationCircle } from "react-icons/fa";
import Button from "../../../components/Button";

const CartPromo = () => {
  const { promo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoInput, setPromoInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const handlePromo = () => {
    if (promoInput === "") return;
    const promoMatch = promoCodes.find((item) => item.code === promoInput);
    setPromoInput("");
    if (promoMatch) {
      dispatch(addPromo({ ...promoMatch }));
    } else {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
    }
  };
  return (
    <div>
      <h3 className={styles.heading}>Promo code</h3>
      <div
        className={`${styles.promo} ${
          promo.code !== null ? styles.applied : ""
        } ${isInvalid ? styles.invalid : ""}`}
      >
        {!isInvalid && (
          <>
            {promo.code !== null && (
              <>
                <span>
                  <FaTag />
                  {`${promo.code} (${promo.percent * 100}% off)`}
                </span>
                <Button
                  fill
                  className={styles.btn}
                  onClick={() => dispatch(removePromo())}
                >
                  Remove
                </Button>
              </>
            )}
            {promo.code === null && (
              <>
                <input
                  aria-label="promo input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                />
                <Button fill className={styles.btn} onClick={handlePromo}>
                  apply
                </Button>
              </>
            )}
          </>
        )}
        {isInvalid && (
          <div className={styles["invalid-content"]}>
            <FaExclamationCircle className={styles["invalid-icon"]} />
            <p>Invalid promo code</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPromo;
