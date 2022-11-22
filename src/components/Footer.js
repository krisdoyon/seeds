import React from "react";
import styled from "styled-components";
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

const Wrapper = styled.footer`
  .footer-grid {
    padding: 5rem 0 5rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    justify-items: center;
    border-top: 1px solid var(--color-grey-3);
    max-width: var(--container-max-width);
    margin: 0 auto;
  }

  .logo {
    height: 5.4rem;
  }

  .footer-contact {
    display: flex;
    gap: 1.8rem;
  }

  .footer-address {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin: 0 auto;
  }

  .footer-social {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .footer-social-icon {
    color: var(--color-primary-dark);
    height: 3.2rem;
    width: 3.2rem;
    transition: all 0.2s;

    &:hover {
      color: var(--color-primary-dark-hover);
    }
  }

  .footer-icon {
    height: 2rem;
    width: 2rem;
    color: var(--color-primary-dark);
  }

  .footer-link {
    &:hover {
      color: var(--color-primary-dark);
      font-weight: 600;
    }
  }

  .copyright {
    background-color: var(--color-primary-dark);
    color: var(--color-white);
    padding: 2rem;
    display: flex;
    justify-content: center;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-grid">
        <div className="footer-column">
          <div className="logo-box">
            <img src="img/logo.png" alt="logo" className="logo" />
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookSquare className="footer-social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitterSquare className="footer-social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagramSquare className="footer-social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutubeSquare className="footer-social-icon" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <FaPinterestSquare className="footer-social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <div className="footer-address">
            <p>3000 Harvest Way</p>
            <p>Hartford, CT 06101</p>
          </div>
          <div className="footer-contact">
            <FaPhoneAlt className="footer-icon" />
            <p>860-245-3385</p>
          </div>
          <div className="footer-contact">
            <FaEnvelope className="footer-icon" />
            <p>contact@harvestseed.com</p>
          </div>
        </div>
        <div className="footer-column">
          <Link className="footer-link" to="/faq">
            FAQ
          </Link>
          <Link className="footer-link" to="/shipping">
            Shipping Policy
          </Link>
          <Link className="footer-link" to="/return">
            Return Policy
          </Link>
          <Link className="footer-link" to="/terms">
            Terms and Conditions
          </Link>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-text">&copy; 2022 Seed Company Inc</div>
      </div>
    </Wrapper>
  );
};

export default Footer;
