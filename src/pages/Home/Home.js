import styles from "./Home.module.scss";
// COMPONENTS
import Slider from "./Slider";
import Features from "./Features/Features";
import NewArrivals from "./NewArrivals/NewArrivals";
import Popular from "./Popular";
import SubscribeForm from "./SubscribeForm/SubscribeForm";

const Home = () => {
  return (
    <main className={`container ${styles.wrapper}`}>
      <Slider />
      <Features />
      <Popular />
      <NewArrivals />
      <SubscribeForm />
    </main>
  );
};

export default Home;
