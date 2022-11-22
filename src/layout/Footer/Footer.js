import styles from "./Footer.module.scss";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaPinterestSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className={styles.grid}>
        <div className={styles.column}>
          <div>
            <img src="/img/logo.png" alt="logo" className={styles.logo} />
          </div>
          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookSquare className={styles["social-icon"]} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitterSquare className={styles["social-icon"]} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagramSquare className={styles["social-icon"]} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutubeSquare className={styles["social-icon"]} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <FaPinterestSquare className={styles["social-icon"]} />
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.address}>
            <p>3000 Harvest Way</p>
            <p>Hartford, CT 06101</p>
          </div>
          <div className={styles.contact}>
            <FaPhoneAlt className={styles.icon} />
            <p>860-245-3385</p>
          </div>
          <div className={styles.contact}>
            <FaEnvelope className={styles.icon} />
            <p>contact@harvestseed.com</p>
          </div>
        </div>
        <div className={styles.column}>
          <Link className={styles.link} to="/faq">
            FAQ
          </Link>
          <Link className={styles.link} to="/shipping">
            Shipping Policy
          </Link>
          <Link className={styles.link} to="/return">
            Return Policy
          </Link>
          <Link className={styles.link} to="/terms">
            Terms and Conditions
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles["copyright-text"]}>
          &copy; 2022 Seed Company Inc
        </div>
      </div>
    </footer>
  );
};

export default Footer;
