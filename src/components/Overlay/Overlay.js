import styles from "./Overlay.module.scss";
import ReactDOM from "react-dom";

const Overlay = () => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}></div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
