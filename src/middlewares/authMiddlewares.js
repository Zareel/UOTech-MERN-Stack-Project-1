import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";
import AuthRoles from "../utils/AuthRoles.js";
//checks authentication
/*
export const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookie;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    //if token found(loggedIn)
    const decoded = JWT.verify(token, config.JWT_SECRET);
    //req.user = decoded;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in middleware",
      error,
    });
  }
};
*/

//isLoggedIn
export const isLoggedIn = (req, res, next) => {
  try {
    const decode =JWT.verify(req.headers.authorization, config.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//isAdmin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== AuthRoles.ADMIN) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

//basic/classic higher order function syntax
export const authorize =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(401).jason({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error in middleware",
        error,
      });
    }
    next();
  };
