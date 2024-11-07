import React, {useContext} from 'react'
import AuthContext from "../../context/authContext";
import UserMenu from '../../components/Layout/UserMenu';


const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div title={"Dashboard-ClickToCart"}>
    <div className="w-full h-full py-16">
    <div className="max-w-7xl mx-auto flex gap-10">
      <div>
        <UserMenu />
      </div>
      <div className="py-6">
        <h1 className="text-xl  text-gray-400">
          User Name:
          <span className=" text-2xl font-semibold tracki uppercase ml-6">
            {auth.user.name}
          </span>
        </h1>
        <h1 className="text-xl  text-gray-400">
          User Email:
          <span className=" text-xl font-semibold tracki lowercase ml-6">
            {auth.user.email}
          </span>
        </h1>
        <h1 className="text-xl  text-gray-400">
          User Contact:
          <span className=" text-xl font-semibold tracki uppercase ml-6">
            {auth.user.phone}
          </span>
        </h1>
        <h1 className="text-xl  text-gray-400">
          User Address:
          <span className=" text-xl font-semibold tracki uppercase ml-6">
            {auth.user.address}
          </span>
        </h1>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Dashboard