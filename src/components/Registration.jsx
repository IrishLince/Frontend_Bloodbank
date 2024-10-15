import React, { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import Bloodbank from '../assets/Bloodbank.webp';


export const Registration = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#8F1600]">
      <div className="lg:w-[30%]">
      {isLogin ? <Login /> : <Signup />}
        <div className="pb-4 text-sm flex items-center justify-between">
            <p>{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold underline">{isLogin ? 'Sign up' : 'Login'}</button>
        </div>
        
      </div>

      <div className="w-1/2 hidden lg:block relative">
  <img 
    className="rounded-3xl w-[89%] h-auto absolute" 
    src={Bloodbank} 
    alt="" 
    style={{ top: '100%', left: '60%', transform: 'translate(-50%, -50%)' }} 
  />
</div>

    </div>
  );
};
