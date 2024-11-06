import exprss from "express";
import {
  logOut,
  login,
  signUp,
  testController,
} from "../controllers/authControllers.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

//router object
const router = exprss.Router();

//routing
//signup || method:post
router.post("/signup", signUp);

//login || method:post
router.post("/login", login);

//logout || method:post
router.post("/logout", logOut);

//middelware test route
router.get("/test", isLoggedIn, isAdmin, testController);
export default router;

//protected user route auth
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//protected admin route auth
router.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});
