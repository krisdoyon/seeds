import styles from "./Modal.module.scss";
import Button from "../Button";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { clearCart, removeItem } from "../../features/cartSlice";
import { removeWishlist } from "../../features/wishlistSlice";

const Modal = ({ children, className }) => {
  const dispatch = useDispatch();
  const { type, title, id } = useSelector((state) => state.modal);

  const handleConfirm = () => {
    if (type === "clear") {
      dispatch(clearCart());
    }
    if (type === "cart") {
      dispatch(removeItem(id));
    }
    if (type === "wishlist") {
      dispatch(removeWishlist(id));
    }
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${className}`}>
      {["cart", "promo", "wishlist"].find((element) => element === type) && (
        <Button
          className={styles["btn-close"]}
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </Button>
      )}
      <div className={styles["modal-content"]}>
        {type === "clear" && <p>Are you sure you want to clear your cart?</p>}
        {(type === "cart" || type === "wishlist") && (
          <>
            <div className={styles.text}>
              <p>Are you sure you want to remove</p>
              <strong>{title}</strong>
              <p>from your {type}?</p>
            </div>
          </>
        )}
        {(type === "clear" || type === "cart" || type === "wishlist") && (
          <div className={styles["modal-btn-container"]}>
            <Button
              fill
              className={styles["btn-cancel"]}
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </Button>
            <Button fill onClick={() => handleConfirm()}>
              Confirm
            </Button>
          </div>
        )}
        {type === "promo" && (
          <>
            <p className={styles.heading}>--- PROMOTION ---</p>
            <p className={styles.percent}>10% OFF!</p>
            <div className={styles.content}>
              <p>Use code</p>
              <p className={styles.promo}>SAVE10</p>
              <p>at checkout.</p>
            </div>
            <Button
              to="/shop"
              className={styles.btn}
              onClick={() => dispatch(closeModal())}
              fill
            >
              SHOP NOW
            </Button>
          </>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
