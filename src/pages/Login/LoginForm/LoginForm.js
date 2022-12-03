import styles from "./LoginForm.module.scss";
import Button from "../../../components/Button";

const LoginForm = () => {
  return (
    <form className={styles.wrapper}>
      <label htmlFor="email" name="email" id="password">
        Email
      </label>
      <input type="text" />
      <label htmlFor="password" name="password" id="password">
        Password
      </label>
      <input type="password" />
      <Button fill>Login</Button>
    </form>
  );
};

export default LoginForm;
