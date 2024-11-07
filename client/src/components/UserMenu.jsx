import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="">
      <div>
        <ul className="bg-stone-800 py-6 flex gap-10 px-6 text-lg font-semibold ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:text-cyan-600 text-green-500 cursor-pointer"
                : "text-stone-300"
            }
            to="/dashboard/user"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:text-cyan-600 text-green-500 cursor-pointer"
                : "text-stone-300"
            }
            to="/dashboard/user/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:text-cyan-600 text-green-500 cursor-pointer"
                : "text-stone-300"
            }
            to="/dashboard/user/orders"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "hover:text-cyan-600 text-green-500 cursor-pointer"
                : "text-stone-300"
            }
            to="/dashboard/user/wishlists"
          >
            WishLists
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default UserMenu;
