import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate()

  // getAllCollection
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

    // create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("collection", collection)
        const { data } = await axios.post("/api/v1/product/create-product", productData);
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

  return (
    <div>
      <div className="max-w-7xl mx-auto  flex">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-cyan-500">Cereate Product</h1>
          <form>
            <Select
              placeholder="Select a collection"
              size="large"
              className="w-[400px] border-none outline-none"
              onChange={(value) => {
                setCollection(value);
              }}
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
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  className="bg-cyan-900 px-6 py-2 rounded-md"
                  hidden
                />
              </label>
            </div>
            <div className="mt-6">
              {photo && (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="img"
                    className="h-[200px]"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-col">
                <input
                  type="text"
                  value={name}
                  placeholder="enter name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-[400px] px-4 py-2 rounded-md mt-4 bg-stone-700 border-none outline-none"
                />
                <textarea
                cols={56}
                rows={3}
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-[400px] px-4 py-2 rounded-md mt-4 bg-stone-700 border-none outline-none"
              />
              <input
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-[400px] px-4 py-2 rounded-md mt-4 bg-stone-700 border-none outline-none"
            />
            <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className="w-[400px] px-4 py-2 rounded-md mt-4 bg-stone-700 border-none outline-none"
          />
              </div>
           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
