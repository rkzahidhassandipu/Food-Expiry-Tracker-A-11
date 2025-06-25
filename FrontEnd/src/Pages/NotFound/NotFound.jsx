import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white rounded-md text-sm font-semibold"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
