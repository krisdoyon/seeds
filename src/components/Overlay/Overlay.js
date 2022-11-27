import styles from "./Overlay.module.scss";
import ReactDOM from "react-dom";

const Overlay = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClick}></div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
