import styles from "./About.module.scss";
import Breadcrumb from "../../components/Breadcrumb";

const About = () => {
  return (
    <div className={styles.wrapper}>
      <Breadcrumb title="about" />
      <div className={styles.grid}>
        <div className={styles.content}>
          <h2 className={styles.heading}>About Us</h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem, asperiores accusamus et, ratione tempora consectetur
            corrupti sapiente vero expedita cumque sequi ex voluptate! Aliquam
            odit incidunt error dicta totam, quaerat praesentium quidem,
            accusantium laudantium fuga deserunt nisi ut est hic excepturi
            maiores sequi fugiat. Ad libero et blanditiis nesciunt facilis!
          </p>
          <p className={styles.text}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus sequi, quas similique cumque quam voluptate. Iusto
            debitis incidunt voluptates facere, porro odit omnis tempore.
            Maiores provident ducimus placeat quibusdam corporis, labore veniam
            dolorum officiis, eos ex explicabo veritatis voluptates. Soluta?
          </p>
        </div>
        <img
          src="/img/about.webp"
          alt="potted seedlings"
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default About;
