import styles from "./LoginForm.module.scss";
import { useRef } from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendAuthRequest } from "../../../features/authSlice";

const LoginForm = ({ isLogin, toggleAuthState }) => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { emailInput, passwordInput, isLoading } = useSelector(
    (state) => state.auth
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      dispatch(
        sendAuthRequest({
          email: enteredEmail,
          password: enteredPassword,
          requestType: "login",
        })
      );
    } else {
      dispatch(
        sendAuthRequest({
          email: enteredEmail,
          password: enteredPassword,
          requestType: "signup",
        })
      );
    }
  };

  let buttonText;
  if (isLogin && !isLoading) {
    buttonText = "Login";
  }
  if (isLogin && isLoading) {
    buttonText = "Logging in...";
  }
  if (!isLogin && !isLoading) {
    buttonText = "Create account";
  }
  if (!isLogin && isLoading) {
    buttonText = "Creating account...";
  }

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <div className={styles["input-wrapper"]}>
        <input
          type="email"
          name="email"
          id="email"
          ref={emailInputRef}
          required
        />
        {emailInput.touched && emailInput.hasError && (
          <div className={styles["error-msg"]}>{emailInput.error}</div>
        )}
      </div>
      <label htmlFor="password">Password</label>
      <div className={styles["input-wrapper"]}>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordInputRef}
          required
        />
        {passwordInput.touched && passwordInput.hasError && (
          <div className={styles["error-msg"]}>{passwordInput.error}</div>
        )}
      </div>
      <Button className={styles.submit} fill disabled={isLoading}>
        {buttonText}
      </Button>
      <div className={styles["btn-container"]}>
        <p>{isLogin ? "New user?" : "Returning user?"}</p>
        <Button
          type="button"
          className={styles["text-btn"]}
          onClick={toggleAuthState}
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
