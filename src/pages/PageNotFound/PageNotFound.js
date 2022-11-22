import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;

  h2 {
    font-size: 4rem;
  }

  p {
    font-size: 2rem;
  }
`;

const PageNotFound = () => {
  return (
    <Wrapper className="container">
      <h2>Oops!</h2>
      <p>
        <strong>404:</strong> Page Not Found
      </p>

      <Link to="/" className="btn btn--fill">
        Go Home
      </Link>
    </Wrapper>
  );
};

export default PageNotFound;
