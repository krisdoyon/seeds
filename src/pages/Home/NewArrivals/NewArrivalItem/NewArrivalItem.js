import styles from "./NewArrivalItem.module.scss";
import { NewTag } from "../../../../components/Tags";
import { Link } from "react-router-dom";

const NewArrivalItem = ({ title, imgURL, linkURL }) => {
  return (
    <article className={styles.item}>
      <Link to={linkURL}>
        <div className={styles["img-container"]}>
          <img src={imgURL} alt={title} />
          <NewTag />
        </div>
        <h4 className={styles.title}>{title}</h4>
      </Link>
    </article>
  );
};

export default NewArrivalItem;
