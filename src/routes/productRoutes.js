import express from "express";
import { createProduct, deleteProduct, getProduct, getSingleProduct, productPhoto, updateProduct,  } from "../controllers/productControllers.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable"
const router = express.Router();

//routes
// createProduct || method:post
router.post("/create-product", isLoggedIn, isAdmin, formidable(), createProduct);

//getAllProducts
router.get("/get-product", getProduct)

//getSingleProduct
router.get("/get-product/:slug", getSingleProduct)

//getProductPhoto
router.get("/product-photo/:pid", productPhoto)

//delete product
router.delete("/delete-product/:pid",isLoggedIn, isAdmin, deleteProduct)

//update product
router.put("/udpate-product/:pid", isLoggedIn, isAdmin,formidable(), updateProduct)


export default router;