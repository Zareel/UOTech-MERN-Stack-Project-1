import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Products = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-allproduct");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      console.log(`Something went wrong while getting app products ${error}`);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 flex">
        <AdminMenu />
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-cyan-500 text-center">All products list</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {products &&
              products.map((item) => {
                return (
                    <Link to={`/dashboard/admin/product/${item.slug}`}  key={item._id}>
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
                        <p className="dark:text-gray-100">
                          {item.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-indigo-400 dark:text-gray-900"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                    </Link>
                 
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
