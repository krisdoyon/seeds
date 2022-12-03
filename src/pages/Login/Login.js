import styles from "./Login.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <section className={styles.wrapper}>
      <Breadcrumb title="login" />
      <LoginForm />
    </section>
  );
};

export default Login;
