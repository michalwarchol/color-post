import {Router} from "express";
import * as userController from "../controllers/userController";

const router: Router = Router();

router.get("/findById", userController.findUserById);
router.post("/isPatternLiked", userController.isPatternLiked);
router.put("/addToFavourites", userController.addLikedPattern);
router.put("/removeFromFavourites", userController.removeLikedPattern);

export default router;