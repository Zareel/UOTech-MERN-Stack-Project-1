import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout>
      <div>
        <AdminMenu/>
      </div>
      <div>Users</div>
    </Layout>
  )
}

export default Users