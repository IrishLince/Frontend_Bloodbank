import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

export const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div>
      {isForgotPassword ? (
        <ForgotPassword setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
      ) : isLogin ? (
        <Login 
          setIsLogin={setIsLogin}
          setIsForgotPassword={setIsForgotPassword}
        />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
};