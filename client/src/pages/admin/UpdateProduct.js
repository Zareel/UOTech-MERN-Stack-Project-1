import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  //   get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setCollection(data.product.collection._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // get all collection
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-collection");
      if (data && data.success) {
        toast.success(data.message);
        setCollections(data?.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong in getting collection ${error}`);
    }
  };

  useEffect(() => {
    getAllCollection();
  }, []);

  // create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("collection", collection);

      const { data } = await axios.put(
        `/api/v1/product/udpate-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong ${error}`);
    }
  };
  // const handleUpdate = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const productData = new FormData();
  //       productData.append("name", name);
  //       productData.append("description", description);
  //       productData.append("price", price);
  //       productData.append("quantity", quantity);
  //       photo && productData.append("photo", photo);
  //       productData.append("collection", collection);
  //       const { data } = axios.put(
  //         `/api/v1/product/update-product/${id}`,
  //         productData
  //       );
  //       if (data?.success) {
  //         toast.error(data?.message);
  //       } else {
  //         toast.success("Product Updated Successfully");
  //         navigate("/dashboard/admin/products");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("something went wrong");
  //     }          
  //   };

  // delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if(data.success){
        toast.success(data.message);
      navigate("/dashboard/admin/products");
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 flex">
        <div>
          <AdminMenu />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-cyan-500">Update Product</h1>
          <form>
            <Select
              placeholder="Select a collection"
              size="large"
              showSearch
              className="w-[400px] border-none outline-none"
              onChange={(value) => {
                setCollection(value);
              }}
              value={collection}
            >
              {collections &&
                collections.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
            <div className="mt-6">
              <label className="bg-cyan-900 px-6 py-2 rounded-md">
                {photo ? photo.name : "Upload image"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="bg-cyan-500 px-6 py-2 rounded-md"
                  hidden
                />
              </label>
            </div>
            <div className="mt-6">
              {photo ? (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="img_product"
                    className="h-[200px]"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="img_product"
                    className="h-[200px]"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col ">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-[400px] px-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none"
                />
                <textarea
                  cols={56}
                  rows={3}
                  type="text"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[400px] px-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none"
                />
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-[400px] px-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none"
                />
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-[400px] ps-4 py-2 rounded-md mt-4 bg-gray-700 border-none outline-none"
                />
              </div>
              <div>
                <Select
                  placeholder="Select Shpping"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  className="w-[400px] border-none outline-none mt-6 bg-gray-700"
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mt-6">
                <button
                  className="bg-sky-900 hover:bg-sky-800 px-6 py-2 rounded-md"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="bg-sky-900 hover:bg-sky-800 px-6 py-2 rounded-md"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
