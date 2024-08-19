import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { useNavigate, useLocation} from "react-router-dom";

const Loader = ({path = "login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, {
      state:location.pathname
    });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-[#111111] text-gray-500">
        <h1 className="text-2xl">{`Redirecting in ${count} seconds`}</h1>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      </div>
    </Layout>
  );
};

export default Loader;
