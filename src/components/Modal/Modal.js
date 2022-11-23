import styles from "./Modal.module.scss";
import Button from "../Button";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { clearCart, removeItem } from "../../features/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { type, title, id } = useSelector((state) => state.modal);

  const handleConfirm = () => {
    if (type === "clear") {
      dispatch(clearCart());
    }
    if (type === "item") {
      dispatch(removeItem(id));
    }
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <Button
          className={styles["btn-close"]}
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </Button>
        <div className={styles["modal-content"]}>
          {type === "clear" && <p>Are you sure you want to clear your cart?</p>}
          {type === "item" && (
            <>
              <div className={styles.text}>
                <p>Are you sure you want to remove</p>
                <strong>{title}</strong>
                <p>from your cart?</p>
              </div>
            </>
          )}
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
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
