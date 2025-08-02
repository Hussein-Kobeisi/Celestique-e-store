import { useState } from "react";
import "./index.css";
import LoginForm from "../../components/login";
import RegisterForm from "../../components/register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {isLogin ? (
          <LoginForm toggle={switchForm} />
        ) : (
          <RegisterForm toggle={switchForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
