import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Navbar />
      <main className="bg-stone-900 text-emerald-200 min-h-[69vh]">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" richColors
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
      }} />
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
