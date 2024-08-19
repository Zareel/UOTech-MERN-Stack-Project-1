import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
 

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data && data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while signing up");
    }
  };
  return (
    <Layout title={"SignUp-ClickToCart"}>
      <div className="w-full h-full py-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold font-roboto text-cyan-500 cursor-pointer py-6">
            SignUp
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col items-center justify-center gap-6"
          >
            <input
              type="text"
              name={name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <input
              type="email"
              name={email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <input
              type="password"
              name={password}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <input
              type="text"
              name={phone}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Phone"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <input
              type="text"
              name={address}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Address"
              required
              className="w-[50%] lg:w-[30%] bg-gray-700 text-white margin-none outline-none px-6 py-2 rounded-md tracking-wider font-semibold"
            />
            <button className="bg-cyan-800 px-6 py-2 rounded-md" type="submit">
              SignUp
            </button>
           
          </form>
        
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
