import React, {useContext} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import AuthContext from '../../context/authContext'

const AdminnDashboard = () => {
  const {auth} = useContext(AuthContext)
  return (
    <Layout>
    <div className="w-full h-full py-16">
      <div className="max-w-7xl mx-auto flex gap-10">
        <div>
          <AdminMenu />
        </div>
        <div className="py-6">
          <div>
          <span className="text-xl w-56  text-gray-400">
            Name:
            <span className=" text-2xl text-pink-400  font-semibold tracki w-56 uppercase ml-6">
              {auth.user.name}
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
  </Layout>
  )
}

export default AdminnDashboard