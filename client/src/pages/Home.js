import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import axios from "axios";
import { Checkbox } from "antd";
import { toast } from "sonner";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [checked, setChecked] = useState([])
  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-allproduct");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  // get all collection
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-collection");
      if (data.success) {
        setCollections(data.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong in getting collection ${error}`);
    }
  };
  useEffect(() => {
    getAllCollection();
  }, []);
  return (
    <div>
      <div className="p-4 flex gap-24">
        <div className="w-1/4 border">
          <h1>filter by collection</h1>
          <div>
            {collections &&
              collections.map((item) => {
                return (
                  <div>
                    <Checkbox key={item._id}>{item.name}</Checkbox>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-3/4 border">
          <h1>All products</h1>

          <div className="flex flex-wrap gap-4 justify-center">
            {products &&
              products.map((item) => {
                return (
                  <div className="w-[250px] rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                    <img
                      src={`/api/v1/product/product-photo/${item._id}`}
                      alt={item.name}
                      className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                    />
                    <div className="flex flex-col justify-between p-6 space-y-8">
                      <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">
                          {item.name}
                        </h2>
                        <p className="dark:text-gray-100">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex items-center justify-center  p-3 font-semibold tracking-wide rounded-md dark:bg-indigo-400 dark:text-gray-900"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center  p-3 font-semibold tracking-wide rounded-md dark:bg-indigo-400 dark:text-gray-900"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
