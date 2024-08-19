import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is required"],
      trim: true,
      unique: true,
      maxLength: [80, "Collection name should not exceed 80 chars"],
    },
    slug:{
      type:String,
      lowercase:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);