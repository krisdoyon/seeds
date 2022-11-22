import React from "react";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";

const Wrapper = styled.div``;

const FAQ = () => {
  return (
    <Wrapper className="container">
      <Breadcrumb title={"FAQ"} />
    </Wrapper>
  );
};

export default FAQ;
