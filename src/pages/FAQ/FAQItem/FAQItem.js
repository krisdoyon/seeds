import styles from "./FAQItem.module.scss";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from "../../../components/Button";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <article className={styles.item}>
      <p className={styles.question}>{question}</p>
      <Button fill className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </Button>
      {isOpen && <p className={styles.answer}>{answer}</p>}
    </article>
  );
};

export default FAQItem;
