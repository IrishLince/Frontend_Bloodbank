import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export const Registration = () => {
  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <div>
      <div>
        {isLogin ? <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};
