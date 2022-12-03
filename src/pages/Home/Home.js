import styles from "./Home.module.scss";
// COMPONENTS
import Slider from "./Slider";
import Features from "./Features/Features";
import NewArrivals from "./NewArrivals/NewArrivals";
import Popular from "./Popular";
import SubscribeForm from "./SubscribeForm/SubscribeForm";

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <Slider />
      <Features />
      <Popular />
      <NewArrivals />
      <SubscribeForm />
    </section>
  );
};

export default Home;
