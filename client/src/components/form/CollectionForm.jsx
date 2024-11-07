import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="pb-6 flex gap-2" >
        <input
          type="text"
          placeholder="enter new collection"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-[400px] rounded-md px-6 py-2 bg-stone-800 border-none outline-none"
        />
        <button type="submit" className="bg-cyan-800 ml-6 px-4 py-1 rounded-md">
          Create
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;
