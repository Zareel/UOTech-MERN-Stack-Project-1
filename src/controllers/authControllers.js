import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

/*
 * signUp
 * route : http://localhost:4000/api/v1/auth/signup
 * description: user signup controller to create new user
 */

export const signUp = async (req, res) => {
  try {
    // get info from the frontend
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name || !email || !password || !phone || !address) {
      res.status(400).json({
        success: false,
        messege: "All the fields are required",
      });
    }
    //check if the user already existing
    const existingUser = await User.findOne({ email });
    //if the user exists send response
    if (existingUser) {
      res.status(200).json({
        success: false,
        messege: "User already exists, please loging",
      });
    }
    //if the user doesn't exists, create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    //safety
    user.password = undefined;
    //send success message to the user
    res.status(201).json({
      success: true,
      messege: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messege: `Error in signing up ${error}`,
      error,
    });
  }
};

/*
 * login
 * route : http://localhost:4000/api/v1/auth/login
 * description: login controller
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        messege: "Invalid email or password",
      });
    }
    //check if the user exists in the database
    const user = await User.findOne({ email }).select("+password");
    //if the user doesn't exists send response
    if (!user) {
      res.status(404).json({
        success: false,
        messege: "No user found, please signup",
      });
    }
    //todo if existing user, compare password
    const isPasswordMatched = await user.comparePassword(password);

    //if password doesn't match send response
    if (!isPasswordMatched) {
      res.status(400).json({
        success: false,
        messege: "Invalid password",
      });
    }
    // todo if password matched generate JWT token

    const token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );

    //flushout password
    user.password = undefined;

    //setup the cookie
    //hey i want to store a value in "cookie", the value is going to be `token`. Also i want this token as httpOnly
    res.cookie("token", token, cookieOptions);
    //console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messege: "Erron in login",
      error,
    });
  }
};

/*
 * logout
 * route : http://localhost:4000/api/v1/auth/logout
 * description: logout controller
 */

export const logOut = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "SuccessfullyLogged Out",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Logging out ${error}`,
      error,
    });
  }
};

/*
 * test
 * route: http://localhost:4000/api/v1/auth/test
 * description: for testing the middleware
 */

export const testController = (req, res) => {
  res.send("Protected route");
};
