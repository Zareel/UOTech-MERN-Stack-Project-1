import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="">
      <div>
        <ul className="bg-stone-800 py-6 flex gap-10 px-6 text-lg font-semibold ">
          <Link className="hover:text-cyan-600 cursor-pointer" to=".">Dashboard</Link>
          <Link className="hover:text-cyan-600 cursor-pointer" to="create-collection">Create Collection</Link>
          <Link className="hover:text-cyan-600 cursor-pointer" to="create-product">Create Products</Link>
          <Link className="hover:text-cyan-600 cursor-pointer" to="users">Users</Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminMenu;
