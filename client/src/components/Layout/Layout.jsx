import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black text-stone-300 ">
      <Navbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>

      <Footer />
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          unstyled: true,
          classNames: {
            error: "bg-red-400  flex items-center px-4 py-3 rounded-md gap-2",
            success:
              "text-green-400 bg-green-500  flex items-center px-4 py-3 rounded-md gap-2",
            warning:
              "text-yellow-400 bg-yellow-500  flex items-center px-4 py-3 rounded-md gap-2",
            info: "bg-blue-400 text-blue-500 w-56 flex items-center px-4 py-3 rounded-md gap-2",
          },
        }}
      />
    </div>
  );
};

Layout.defaultProps = {
  title: "ClickToCart",
  description: "MERN Stack Ecommerce App",
  keywords:
    "MERN Stack, NodeJS, ExpressJS, MongoDB, ReactJS, JavaScript, HTML, TailwindCSS",
  author: "Zareel Kalam",
};

export default Layout;
