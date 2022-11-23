import styles from "./Slide.module.scss";
import Button from "../../../../components/Button";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  updateFilters,
} from "../../../../features/productsSlice";

const Slide = ({ title, text, to, image, slideClass, position, filter }) => {
  const dispatch = useDispatch();
  return (
    <article
      className={`${styles.slide} ${styles[slideClass]}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position,
      }}
    >
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.text}>{text}</p>
        <Button
          fill
          to={to}
          className={styles.btn}
          onClick={() => {
            if (filter) {
              dispatch(clearFilters());
              dispatch(updateFilters({ filter, value: true }));
            } else {
              dispatch(clearFilters());
            }
          }}
        >
          Shop
        </Button>
      </div>
    </article>
  );
};

export default Slide;
