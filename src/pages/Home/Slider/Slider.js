import styles from "./Slider.module.scss";
import { useEffect, useState } from "react";
import Slide from "./Slide";
import { slides } from "./slidesData";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../../../components/Button";

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(slides.length - 1);
    }
    if (index > slides.length - 1) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    const timer = setTimeout(() => setIndex(index + 1), 7000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={styles.slider}>
      {slides.map((slide, i) => {
        let slideClass = "next";

        if (i === index) {
          slideClass = "active";
        }

        if (i === index - 1 || (index === 0 && i === slides.length - 1)) {
          slideClass = "prev";
        }

        return <Slide key={i} slideClass={slideClass} {...slide} />;
      })}
      <div className={styles.controls}>
        <Button
          className={styles["btn-prev"]}
          onClick={() => setIndex(index - 1)}
        >
          <FaChevronLeft className={styles.icon} />
        </Button>
        {slides.map((_, i) => {
          return (
            <Button
              key={i}
              className={`${styles["btn-circle"]} ${
                index === i ? styles.active : ""
              }`}
              onClick={() => setIndex(i)}
            ></Button>
          );
        })}
        <Button
          className={styles["btn-next"]}
          onClick={() => setIndex(index + 1)}
        >
          <FaChevronRight className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};

export default Slider;
