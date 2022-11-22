import styles from "./Slide.module.scss";
import Button from "../../../../components/Button";

const Slide = ({ title, text, to, image, slideClass, position }) => {
  return (
    <article
      className={`${styles.slide} ${styles[slideClass]}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position,
      }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Button fill to={to} className={styles.btn}>
          Shop
        </Button>
      </div>
    </article>
  );
};

export default Slide;
