import React from "react";
import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const SignInWithGoogle = ({label}) => {
    const {SignInWithGoogle} = use(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

     
  const handleGoogleSignup = () => {
    console.log("Google signup");
    SignInWithGoogle()
    .then(result => {
      navigate(from, {replace: true})
        console.log(result.user)
    })
    .catch(error => {
        console.log(error)
    })
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignup}
        className="btn btn-outline w-full flex justify-center items-center gap-2"
      >
        <FcGoogle size={22} />
        {label}
      </button>
    </div>
  );
};

export default SignInWithGoogle;
