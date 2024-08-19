import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/authContext";

const Home = () => {
  const { auth} = useContext(AuthContext);
  return (
    <Layout title={"Homepage-ClickToCart"}>
      <div className="p-4">
      <h1>home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default Home;
