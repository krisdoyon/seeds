import React from "react";
import styled from "styled-components";

// COMPONENTS
import Slider from "./Slider";
import Features from "./Features";
import NewArrivals from "./NewArrivals";
import Popular from "./Popular";
import SubscribeForm from "./SubscribeForm";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10rem;
`;

const Home = () => {
  return (
    <Wrapper className="container">
      <Slider />
      <Features />
      <NewArrivals />
      <Popular />
      <SubscribeForm />
    </Wrapper>
  );
};

export default Home;
