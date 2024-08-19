import express from "express";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import crypto from "crypto";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url";


const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

//rest object
const app = express();

//middleware
app.use(cors()); // allows to interact with client which is loaded in different domain
app.use(express.json()); // instructing the app to accept data in the json format
app.use(cookieParser()); // it allows the server to access the user cookies
app.use(morgan("dev")); // logs requests, erros and more to the console
app.use(express.urlencoded({ extended: true })); // instructing the app to accept data in the url encoded format as well
app.use(express.static(path.join(__dirname, "../client/build")))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/collection", collectionRoutes)
app.use("/api/v1/product", productRoutes)

//secret key generation
/*
const key = crypto.randomBytes(64).toString("hex");
console.log(key);
*/

//rest api
app.use("*", function(req, res){
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

export default app;
