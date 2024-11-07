import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Error from "../src/pages/Error";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import AdminnDashboard from "./pages/admin/AdminnDashboard";
import Layout from "./components/Layout/Layout";
import AdminMenu from "./components/AdminMenu";
import CreateCollection from "./pages/admin/CreateCollection";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import UserDashboard from "./pages/user/UserDashboard";
import Orders from "./pages/user/Orders";
<<<<<<< HEAD
import CreateCollection from "./pages/admin/CreateCollection";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
=======
import Profile from "./pages/user/Profile";
import WishLists from "./pages/user/WishLists";
import UserRoute from "./components/Routes/UserRoute";

/*
      <Route path="user" element={<UserMenu/>}>
          <Route index element={<UserDashboard/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="wishlists" element={<WishLists/>}/>
          <Route/>
        </Route>

*/
>>>>>>> 182a5750d4349fb4e47bf6d515fc9120b18d089e

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminnDashboard />} />
        <Route path="admin/create-collection" element={<CreateCollection />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Error />} />
=======
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="collection" element={<Collection />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Error />} />

        <Route path="/dashboard" element={<UserRoute />}>
       
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/wishlists" element={<WishLists />} />
          <Route />
        </Route>

        <Route path="admin" element={<AdminMenu />}>
          <Route index element={<AdminnDashboard />} />
          <Route path="create-collection" element={<CreateCollection />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
>>>>>>> 182a5750d4349fb4e47bf6d515fc9120b18d089e
    </Routes>
  );
}

export default App;
