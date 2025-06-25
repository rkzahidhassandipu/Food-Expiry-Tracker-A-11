import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const User = () => {
  const { user } = useAuth();
  const { signOutUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
      toast.success("You are successfully logged in")
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative mr-6" ref={dropdownRef}>
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        onError={(e) =>
          (e.target.src =
            "https://i.postimg.cc/Y9cx8pCc/user-avatar-female-9.png")
        }
        className="w-10 h-10 rounded-full cursor-pointer border"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 w-auto shadow-md border rounded-md z-10 p-2">
          <div className="border-b pb-2">
            <p className="text-sm flex items-center">
              <strong>Name:</strong>&nbsp;{user?.displayName}
            </p>
            <p className="text-sm flex items-center">
              <strong>Email:</strong>&nbsp;{user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-1 mt-4 text-sm w-full bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
