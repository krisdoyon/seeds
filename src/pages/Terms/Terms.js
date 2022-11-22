import styles from "./Terms.module.scss";
import Breadcrumb from "../../components/Breadcrumb";

const Terms = () => {
  return (
    <section className={`container ${styles.wrapper}`}>
      <Breadcrumb title="Terms" />
    </section>
  );
};

export default Terms;
