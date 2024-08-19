import e from "express";
import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

//createCollection || method:post || /api/v1/collection/create-collection
export const createCollection = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "Please provide collection name",
      });
    }
    const existingCollection = await Collection.findOne({ name });
    if (existingCollection) {
      return res.status(200).json({
        success: true,
        message: "Collecion already exists",
      });
    }
    const collection = await Collection.create({ name, slug: slugify(name) });
    res.status(200).json({
      success: true,
      message: "New collection has been created successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating collection",
      error,
    });
  }
};

//updateCollection ||  method:put || /api/v1/collection/update-collection
export const updateCollection = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    //target it with id and mentiong what to update(here name and slug, use slugify) and the third paramenter is new (if you donot add that the category name will not get updated)
    const collection = await Collection.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "New Collection has been created successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in update collection functionality ${error}`,
      error,
    });
  }
};

//get-collection || method:get || /api/v1/collection/get-collection
export const getCollection = async (req, res) => {
  try {
    const collection = await Collection.find({});
    res.status(200).json({
      success: true,
      count:collection.length,
      message: "Collection has been fetched successfully",
      collection,
    });
  } catch (error) {
    console.log(`Error in fetching collection ${error}`);
    res.status(error).json({
      success: false,
      message: "Error in fetching collection",
      error,
    });
  }
};

//get-single-collection || method:get || /api/vi/collection/single-collection
export const singleCollection = async(req, res) => {
  try{
    //as we can get slug from the url, lets use slug to target partucular collection. this time lets try to pass it directcly instead of destructuring
    //const {slug} = req.params
    const collection = await Collection.findOne({slug:req.params.slug})
    res.status(200).json({
      success:true,
      message:"Collection has been fetched successfully",
      collection
    })

  }catch(error){
    console.log(`Error in fetching single collection`),
    res.status(500).json({
      success:false,
      message:"Error in fetching single collection",
      error
    })  }
}

// deletecollection || method:delete || /api/v1/categoru/delete-collection
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(id);
    if (!collectionToDelete) {
      return res.status(400).json({
        success: false,
        message: "collection not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Collection has been deleted successfully",
      collectionToDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting collection",
      error,
    });
  }
};
