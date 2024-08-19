import express from "express";
import {
  createCollection,
  deleteCollection,
  getCollection,
  singleCollection,
  updateCollection,
} from "../controllers/collectionControllers.js";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

//routes
//createcategory || method:post || /api/v1/category/create-category
router.post("/create-collection", isLoggedIn,isAdmin, createCollection);

//updatecollection || method:put || /api/v1/category/update-category
router.put("/update-collection/:id", isLoggedIn, isAdmin, updateCollection)

//getCollection || method:get || /api/v1/collection/get-collection
router.get("/get-collection", getCollection)

//get-single-collection || method:get || /api/v1/collection/single-collection
router.get("/single-collection/:slug", singleCollection)

//deletecategory || method:del
router.delete("/delete-collection/:id", isLoggedIn, isAdmin, deleteCollection);

export default router;
