import React, {useContext} from 'react'
import AuthContext from '../../context/authContext'

const AdminnDashboard = () => {
  const {auth} = useContext(AuthContext)
  return (
    <div>
    <div className="w-full h-full ">
      <div className="max-w-7xl mx-auto flex gap-10">
        
        <div className="py-6">
          <div>
          <span className="text-xl w-56  text-gray-400">
            Name:
            <span className=" text-xl text-pink-400  font-semibold tracki w-56 uppercase ml-6">
              {auth.user.name}
            </span>
          </span>
          </div>
          <div>
          <span className="text-xl w-56  text-gray-400">
            Role:
            <span className=" text-2xl text-cyan-400  font-semibold tracki w-56 uppercase ml-6">
              {auth.user.role}
            </span>
          </span>
          </div>
        <div>
        <span className="text-xl w-56 text-gray-400">
         Email:
        <span className="w-56 text-xl font-semibold tracki lowercase ml-6">
          {auth.user.email}
        </span>
      </span>
        </div>
        
        <div>
        <span className="text-xl  text-gray-400">
        Contact:
        <span className=" text-xl font-semibold tracki uppercase ml-6">
          {auth.user.phone}
        </span>
      </span>
       </div>
       <div>
       <span className="text-xl w-1/2  text-gray-400">
       Address:
       <span className=" text-xl font-semibold w-1/2 tracki uppercase ml-6">
         {auth.user.address}
       </span>
     </span>
       </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminnDashboard