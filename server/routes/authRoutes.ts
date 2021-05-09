import {Router} from "express";
import * as authController from "../controllers/authController";

const router: Router = Router();

router.get("/logout", authController.logout_get);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);


export default router;