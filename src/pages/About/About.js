import React from "react";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";

const Wrapper = styled.div`
  margin-top: var(--container-margin-top);

  .about-grid {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr max-content;
    column-gap: 6rem;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .about-text {
    font-size: 2rem;
    line-height: 1.6;
  }

  .about-img {
    width: 50rem;
    height: 60rem;
    object-fit: cover;
  }

  h2 {
    font-size: 3.6rem;
    margin-bottom: 1rem;
  }
`;

const About = () => {
  return (
    <Wrapper className="container">
      <Breadcrumb title={"about"} />
      <div className="about-grid">
        <div className="about-content">
          <h2>About Us</h2>
          <p className="about-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem, asperiores accusamus et, ratione tempora consectetur
            corrupti sapiente vero expedita cumque sequi ex voluptate! Aliquam
            odit incidunt error dicta totam, quaerat praesentium quidem,
            accusantium laudantium fuga deserunt nisi ut est hic excepturi
            maiores sequi fugiat. Ad libero et blanditiis nesciunt facilis!
          </p>
          <p className="about-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus sequi, quas similique cumque quam voluptate. Iusto
            debitis incidunt voluptates facere, porro odit omnis tempore.
            Maiores provident ducimus placeat quibusdam corporis, labore veniam
            dolorum officiis, eos ex explicabo veritatis voluptates. Soluta?
          </p>
        </div>

        <div className="about-img-container">
          <img
            src="/img/about.webp"
            alt="potted seedlings"
            className="about-img"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
