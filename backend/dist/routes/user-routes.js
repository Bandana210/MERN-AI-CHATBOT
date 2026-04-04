import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers.js";
import { signupValidator, validate } from "../utils/validators.js";
import { userLogin, userLogout } from "../controllers/user-controllers.js";


const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/auth-status", userLogout);
userRoutes.get("/logout", userLogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map