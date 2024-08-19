import app from "./src/app.js";
import colors from "colors"
import config from "./src/config/config.js";
import mongoose from "mongoose";



(async (req,res) => {
    try{
await mongoose.connect(config.MONGODB_URL)
console.log("Successfully connected to MONGODB".bgBlack.magenta);

// error handling for express
app.on("error", (error) => {
    console.log("Error: ", error);
    throw error
})
const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`.bgBlack.blue);
})
    }catch(error){
        console.log(`Error in DB connection ${error}`.bgRed.white);
        res.status(500).json({
            success:false,
            message:"Error in connecting with MONGODB",
            error
        })

    }
})()








