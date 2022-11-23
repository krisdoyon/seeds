import styles from "./Stars.module.scss";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const Stars = ({ avg, num, text }) => {
  const starsArr = Array.from({ length: 5 }, (_, index) => {
    return avg >= index + 1 ? (
      <FaStar key={index} className={styles.icon} />
    ) : avg >= index + 0.5 ? (
      <FaStarHalfAlt key={index} className={styles.icon} />
    ) : (
      <FaRegStar key={index} className={styles["icon-empty"]} />
    );
  });

  return (
    <div className={styles.stars}>
      <p>{starsArr}</p>
      <p>({num} reviews)</p>
    </div>
  );
};

export default Stars;
