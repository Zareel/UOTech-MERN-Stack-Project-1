import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation()
  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem("auth", JSON.stringify(data))

        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error);
      alert("Error in Login");
    }
  };
  return (
    <Layout title={"Login-ClickToCart"}>
      <div className="w-full h-full py-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold font-roboto text-cyan-500 cursor-pointer py-6">
            Login
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col items-center justify-center gap-6"
          >
            <input
              type="email"
              name={email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
              className="w-[50%] lgw-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <input
              name={password}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />

            <button className="bg-cyan-800 px-6 py-2 rounded-md" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
