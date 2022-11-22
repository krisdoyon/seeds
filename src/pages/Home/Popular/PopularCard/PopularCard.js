import styles from "./PopularCard.module.scss";
import { Link } from "react-router-dom";

const PopularCard = ({ title, img, link }) => {
  return (
    <article className={styles.card}>
      <Link to={link}>
        <img src={img} alt={title} />
        <h3>{title}</h3>
      </Link>
    </article>
  );
};

export default PopularCard;
