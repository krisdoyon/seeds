import React from "react";

// COMPONENTS
import Slider from "./Slider";
import Features from "./Features";
import NewArrivals from "./NewArrivals";
import Popular from "./Popular";

const Home = () => {
  return (
    <main>
      <Slider />
      <Features />
      <NewArrivals />
      <Popular />
    </main>
  );
};

export default Home;
