import styles from "./FAQ.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import { faqArr } from "./FAQdata";
import FAQItem from "./FAQItem/FAQItem";

const FAQ = () => {
  return (
    <section>
      <Breadcrumb title="FAQ" />
      <div className={styles.content}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.items}>
          {faqArr.map((item, i) => {
            return <FAQItem key={i} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
