import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ Use react-router-dom
import LoginAnimation from "../../Components/animation/LoginAnimation";
import SignInWithGoogle from "../../Components/SignInWithGoogle/SignInWithGoogle";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Login = () => {
  const {signInUser} = use(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate= useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
      toast.success("You are successfully logged in")
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };


  return (
    <div className="min-h-screen py-20 bg-gradient-to-r from-slate-800 to-gray-900 flex items-center justify-center px-4">
       <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || Login</title>
      </Helmet>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10">
        
        {/* Animation */}
        <div className="hidden md:flex justify-center items-center">
          <LoginAnimation />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-6">
            Welcome Back!
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full uppercase tracking-wide"
            >
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <SignInWithGoogle label="Sign in with Google" />

          <p className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
