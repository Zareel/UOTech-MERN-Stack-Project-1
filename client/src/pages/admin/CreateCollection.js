import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import CollectionForm from "../../components/form/CollectionForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "antd";

const CreateCollection = () => {
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/collection/create-collection",
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getAllCollection();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating collection");
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

  //update Collection
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
        handleOk();
        getAllCollection();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong while updating collection ${error}`);
    }
  };

  //handle delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/collection/delete-collection/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCollection();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong while deleting collection ${error}`);
    }
  };
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl text-cyan-500 py-6">Create Collection</h1>
      <div>
        <CollectionForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
      </div>
      <div>
        <table className="min-w-[500px] text-lg border ">
          <thead className="rounded-t-lg dark:bg-gray-700 border">
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {collection &&
              collection.map((item) => (
                <tr className="border">
                  <td className="border pl-4" key={item._id}>
                    {item.name}
                  </td>
                  <td className="flex gap-6 pl-4">
                    <EditIcon
                      onClick={() => {
                        setIsModalOpen(true);
                        setUpdatedName(item.name);
                        setSelected(item);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Update Collection"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CollectionForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default CreateCollection;
