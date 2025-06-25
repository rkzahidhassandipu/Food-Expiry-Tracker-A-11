import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ FIXED: use react-router-dom
import { FcGoogle } from "react-icons/fc";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SignInWithGoogle from "../../Components/SignInWithGoogle/SignInWithGoogle";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, updateUserProfile } = use(AuthContext);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
    const navigate= useNavigate();
  
    const from = location.state?.from?.pathname || '/';

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const validatePassword = (password) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
    toast.error(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
    );
    return;
  }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    createUser(email, password)
      .then(() => {
        return updateUserProfile({
          displayName: name,
          photoURL: imageUrl,
        });
      })
      .then(() => {
        toast.success("User registered successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Registration error:", error);
        toast.error(error.message || "Registration failed.");
      });
  };

  return (
    <div className="min-h-screen dark:text-white py-10 bg-gradient-to-r from-slate-800 to-gray-900 flex items-center justify-center p-4">
       <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry || Register</title>
      </Helmet>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input border-white dark:bg-gray-800 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              name="name"
            />
          </div>

          {/* ✅ Profile Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Profile Image URL</span>
            </label>
            <input
              type="text"
              placeholder="https://example.com/your-photo.jpg"
              className="input border-white dark:bg-gray-800 w-full"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              name="photoURL"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input border-white dark:bg-gray-800 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Choose a strong password"
              className="input border-white dark:bg-gray-800 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="input border-white dark:bg-gray-800 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              name="confirmPassword"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>
        <div className="divider my-6">OR</div>

        <SignInWithGoogle label="Sign Up with Google" />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
