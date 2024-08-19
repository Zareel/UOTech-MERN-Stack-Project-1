import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Error from "../src/pages/Error";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Dashboard from "./pages/user/Dashboard";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { AdminRoute } from "./components/Routes/AdminRoute";
import AdminnDashboard from "./pages/admin/AdminnDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import CreateCollection from "./pages/admin/CreateCollection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
      </Route>
      

      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminnDashboard/>}/>
        <Route
            path="admin/create-collection"
            element={<CreateCollection />}
          />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
      </Route>


      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
