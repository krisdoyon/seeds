import styles from "./Modal.module.scss";
import Button from "../Button";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { clearCart, removeCartItem } from "../../features/cartSlice";
import { clearWishlist, removeWishlist } from "../../features/productsSlice";
import { returnOrder } from "../../features/ordersSlice";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, action, page, title, id, error, message } = useSelector(
    (state) => state.modal
  );

  const handleConfirm = () => {
    if (action === "clear" && page === "cart") {
      dispatch(clearCart());
    }
    if (action === "clear" && page === "wishlist") {
      dispatch(clearWishlist());
    }
    if (action === "remove" && page === "cart") {
      dispatch(removeCartItem(id));
    }
    if (action === "remove" && page === "wishlist") {
      dispatch(removeWishlist(id));
    }
    if (action === "return" && page === "orders") {
      dispatch(returnOrder(id));
      navigate("/orders");
    }
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <div className={`${styles.modal} ${className}`}>
      {type !== null && (
        <Button
          className={styles["btn-close"]}
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </Button>
      )}
      <div className={styles["modal-content"]}>
        {action === "clear" && (
          <p>Are you sure you want to clear your {page}?</p>
        )}
        {action === "load" && (
          <p>
            Are you sure you want to load test orders? <br />
            This action will overwrite all current orders.
          </p>
        )}
        {action === "remove" && (
          <>
            <div className={styles.text}>
              <p>Are you sure you want to remove</p>
              <strong>{title}</strong>
              <p>from your {page}?</p>
            </div>
          </>
        )}
        {action === "return" && (
          <>
            <div className={styles.text}>
              <p>Are you sure you want to return</p>
              <strong>Order #{title}?</strong>
            </div>
          </>
        )}
        {type === "confirm" && (
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
        {type === "error" && (
          <>
            <strong>Error:</strong>
            <p>{message}</p>
            <p>{error}</p>
          </>
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
