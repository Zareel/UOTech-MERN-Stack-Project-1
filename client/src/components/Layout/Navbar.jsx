import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "../../context/authContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
//import axios from "axios";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [extendNavbar, setExtendNavbar] = useState(false);
  const navigate = useNavigate();

  console.log(extendNavbar);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Successfully loggedOut");
    navigate("/");
  };

  /*
const handleLogout = async() => {
  try{


  }catch(error){
    console.log(`Something went wrong while logging out ${error}`);
    alert(`Something went wrong while logging out ${error}`)
  }
    
}
  */
  return (
    <div
      className={`bg-stone-950 text-cyan-200 py-4 duration-500  px-4 ${
        extendNavbar ? "h-80" : "h-20"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-6 flex justify-between items-start h-full `}
      >
        <h1
          className={`flex    p-2 text-4xl font-semibold text-cyan-400 hover:text-cyan-600 cursor-pointer`}
        >
          ClickToCart
        </h1>
        <div className="flex items-center">
        <div className="flex gap-2 lg:gap-6 items-center py-2">
        <Link to="/" className="text-2xl">
        Home
      </Link>

      <p className="flex items-center px-4 pr-6 font-poppins text-2xl font-semibold text-pink-400 cursor-pointer">
        {auth.user && auth.user.name}
      </p>
        </div>
          <ul
            className={`lg:static absolute flex flex-col lg:flex-row gap-6 text-xl duration-500 ${
              extendNavbar ? "top-24 right-10" : "top-24 right-[-100px]"
            }`}
          >
            {!auth.user ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <Link to="/login">Login</Link>
                <Link to="/signup">SighUp</Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <Link to="/collection">Collection</Link>

                <div
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex flex-col justify-center relative"
                >
                  <p className="flex items-center px-4 -mb-1 font-poppins text-lg cursor-pointer">
                    {auth.user.role} <ArrowDropDownIcon />
                  </p>
                  {openMenu ? (
                    <div className="flex flex-col absolute top-20 left-10 gap-4 text-lg ">
                      <Link
                        to={`/dashboard/${
                          auth.user.role === "ADMIN" ? "admin" : "user"
                        }`}
                        className="cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <p className="cursor-pointer ">Profile</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Link to="/cart">
                  <ShoppingCartIcon className="text-2xl" />
                  <span>0</span>
                </Link>

                <Link to="/" onClick={handleLogout}>
                  LogOut
                </Link>
              </div>
            )}
          </ul>
          <div className={`flex gap-6 py-2 items-center`}>
         

            <div
              className="lg:hidden "
              onClick={() => {
                setExtendNavbar((open) => !open);
              }}
            >
              {extendNavbar ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
