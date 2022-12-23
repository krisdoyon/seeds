import styles from "./Stars.module.scss";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const Stars = ({ avg, num }) => {
  const starsArr = Array.from({ length: 5 }, (_, index) => {
    return avg >= index + 1 ? (
      <FaStar key={index} className={styles.icon} title={"full star"} />
    ) : avg >= index + 0.5 ? (
      <FaStarHalfAlt
        key={index}
        className={styles.icon}
        title={"half star"}
      />
    ) : (
      <FaRegStar
        key={index}
        className={styles["icon-empty"]}
        title={"empty star"}
      />
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
