import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-6 ">
        <input
          type="text"
          placeholder="Enter new Collection"
          className="w-full rounded-md px-6 py-2 bg-gray-600 border-none outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="bg-gray-600 px-4 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default CollectionForm;
