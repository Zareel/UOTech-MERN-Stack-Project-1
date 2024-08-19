import React from 'react'

import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <aside className="w-full    sm:w-60  dark:text-gray-100">
    <nav className="space-y-8 text-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracki uppercase text-gray-400   pb-6  ">
          User Dashboard
        </h2>
        <div className="flex flex-col space-y-1 text-lg gap-4">
          <Link
            to="/dashboard/user/profile"
            className="text-xl text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="text-xl text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  </aside>
  )
}

export default UserMenu