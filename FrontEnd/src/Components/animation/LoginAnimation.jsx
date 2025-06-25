import React from "react";
import Lottie from "lottie-react";
import LoginAnimations from "../../assets/Lottie/LoginAnimation.json";

const LoginAnimation = () => {
  return (
    <div className="w-full max-w-md">
      <Lottie
        animationData={LoginAnimations}
        loop
        autoplay
        className="w-full h-auto"
      />
    </div>
  );
};

export default LoginAnimation;
