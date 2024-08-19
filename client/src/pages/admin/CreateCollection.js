import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "sonner";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionForm from "../../components/Form/CollectionForm";
import { Modal } from "antd";

const CreateCollection = () => {
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/collection/create-collection",
        { name }
      );
      if (data && data.success) {
        toast.success(data.message);
        getAllCollection();
        setName("");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(`Error in creating collection ${error}`);
      toast.error(`Something went wrong while creating collection ${error}`);
    }
  };

  // get all collection
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-collection");
      if (data.success) {
        setCollection(data.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong in getting collection ${error}`);
    }
  };
  useEffect(() => {
    getAllCollection();
  }, []);

  // update collection
  //handleUpdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/collection/update-collection/${selected._id}`,
        { name: updatedName }
      );
      if (data && data.success) {
        setSelected(null);
        setUpdatedName("");
        handleCancel();
        getAllCollection();
        toast.success(data.message)
      } else {
        alert(data && data.message);
      }
    } catch (error) {
      alert("Something went wrong in handleUpdate functionality");
    }
  };

  // handle Delete
  const handleDelete = async(id) => {
    try{
      const {data} = await axios.delete(`/api/v1/collection/delete-collection/${id}`)
      if(data.success){
        toast.success(data.message)
      getAllCollection()
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error);
      toast.error(`Something went wrong ${error}`)
    }
  }
 
  return (
    <Layout>
      <div className="max-w-7xl mx-auto h-full py-16 flex">
        <div className="">
          <AdminMenu />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-cyan-500">Manage Collection</h1>
          <div>
            <CollectionForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <table className="min-w-[500px] text-lg border">
            <thead className="rounded-t-lg dark:bg-gray-700 border">
              <tr className="text-right">
                <th title="Ranking" className="p-3 text-left">
                  name
                </th>
                <th title="Team name" className="p-3 text-left">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {collection &&
                collection.map((item) => (
                  <tr className="border">
                    <td className="border" key={item._id}>
                      {item.name}
                    </td>
                    <td>
                      <div className="flex gap-6">
                        <EditIcon
                          className="cursor-pointer hover:text-yellow-300"
                          onClick={() => {
                            setIsModalOpen(true);
                            setUpdatedName(item.name);
                            setSelected(item);
                          }}
                        />
                        <DeleteIcon className="hover:text-red-500" onClick={() => {handleDelete(item._id)}} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          visible={isModalOpen}
          title="Basic Modal"
        >
          <CollectionForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCollection;
