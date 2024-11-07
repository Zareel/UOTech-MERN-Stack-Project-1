import Product from "../models/productSchema.js";
import fs from "fs";
import slugify from "slugify";

// createProduct
export const createProduct = async (req, res) => {
  try {
    //get info from frontend. As we have installed formidable we will grab info from `req.fields` instead of `req.body`
    const { name, description, price, collection, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    } //photo validation (1MB)
    // 1MB = 1024 KiloBytes
    // 1MB = 1000000 Bytes
    if (!photo && photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Photo is required and should be less than 1mb",
      });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });
    //if there is photo, we will make some changes in the product we receive
    //sinc the data through fs module and pass the path
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//getProduct
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("collection")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 }); //here we can use multiple filters. and we are not selecting photos to reduce the size of our request. otherwise it takes more time to load. we will create another api for photos and merge it to improve the performance of our application
    res.status(200).json({
      success: true,
      productCount: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(`Error in getting  product functionality ${error}`);
    res.status(500).json({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

// getSingleProduct
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("collection");
    res.status(200).json({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(`Error in getting single product ${error}`);
    res.status(500).json({
      success: false,
      message: "Error in getting single product",
    });
  }
};

//prouductPhoto
export const productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(`Error in getting photo`);
    res.status(500).json({
      success: false,
      message: "Error in fetching photo",
      error,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const productToDelete = await Product.findByIdAndDelete(
      req.params.pid
    ).select("-photo");
    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
      productToDelete,
    });
  } catch (error) {
    console.log(`Error in deleting product ${error}`);
    res.status(500).json({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};


//udateProduct
export const updateProduct = async (req, res) => {
  try {
    //get info from frontend. As we have installed formidable we will grab info from `req.fields` instead of `req.body`
    const { name, description, price, collection, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    if (!name || !description || !price) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the fields",
      });
    } //photo validation (1MB)
    if (!photo && photo.size > 1000000) {
      return res.status(500).json({
        success: false,
        message: "Photo is required and should be less than 1mb",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    //if there is photo, we will make some changes in the product we receive
    //sinc the data through fs module and pass the path
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product updated Successfully",
      product,
    });
  } catch (error) {
    console.log(`Error in updating product`);
    res.status(500).json({
      success: false,
      message: `Error in updating the product ${error}`,
      error,
    });
  }
};
