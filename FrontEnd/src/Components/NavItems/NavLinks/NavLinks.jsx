import React from "react";
import { BiFridge } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { MdLogin, MdOutlineFormatListNumbered } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import { NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import User from "../../User/User";

const NavLinks = () => {
  const {user} = useAuth();
  return (
    <>
      <li>
        <NavLink className="px-4 py-2 rounded-md text-sm mr-4" to="/">
          <span>
            <RiHomeHeartLine className="text-xl" />
          </span>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="px-4 py-2 rounded-md text-sm mr-4" to="/fridge">
          <span>
            <BiFridge className="text-xl" />
          </span>
          <span>Fridge</span>
        </NavLink>
      </li>

      <>
        {user ? (
          <>
            <li>
              <NavLink
                className="px-4 py-2 rounded-md text-sm mr-4"
                to="/addFood"
              >
                <span>
                  <CiCirclePlus className="text-xl" />
                </span>
                <span>Add Food</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="px-4 py-2 rounded-md text-sm mr-4"
                to="/myItems"
              >
                <span>
                  <MdOutlineFormatListNumbered className="text-xl" />
                </span>
                <span>My Items</span>
              </NavLink>
            </li>
            <User />
          </>
        ) : (
          <>
            <li>
              <NavLink
                className="px-4 py-2 rounded-md text-sm mr-4"
                to="/login"
              >
                <span>
                  <MdLogin className="text-xl" />
                </span>
                <span>Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="px-4 py-2 rounded-md text-sm mr-4"
                to="/register"
              >
                <span>
                  <FaUserPlus className="text-xl" />
                </span>
                <span>Register</span>
              </NavLink>
            </li>
          </>
        )}
      </>
    </>
  );
};

export default NavLinks;
