import styles from "./PageNotFound.module.scss";
import Button from "../../components/Button";

const PageNotFound = () => {
  return (
    <div className={`container ${styles.wrapper}`}>
      <h2>Oops!</h2>
      <p>
        <strong>404:</strong> Page Not Found
      </p>
      <Button to="/" fill>
        Go Home
      </Button>
    </div>
  );
};

export default PageNotFound;
