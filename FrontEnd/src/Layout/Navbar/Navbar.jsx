import React from "react";
import LightDark from "../../Components/NavItems/LightDark/LightDark";
import NavLinks from "../../Components/NavItems/NavLinks/NavLinks";
import Logo from "../../Components/NavItems/Logo/Logo";
import { Link } from "react-router"; // ✅ FIXED: use react-router-dom

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-700">
      <div className="w-4/5 mx-auto navbar">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="navbar-end flex-1/2">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavLinks />
            </ul>
          </div>

          {/* <LightDark /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
