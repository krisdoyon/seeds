import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import LoginForm from "./LoginForm/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import { sendTestRequest } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { userId, token, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account");
    }
  }, [isLoggedIn]);

  const toggleAuthState = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={styles.wrapper}>
      <Breadcrumb title="login" />
      <div className={styles["form-wrapper"]}>
        <h2>{isLogin ? "Login" : "Create an Account"}</h2>
        <LoginForm isLogin={isLogin} toggleAuthState={toggleAuthState} />
      </div>
    </section>
  );
};

export default Login;
