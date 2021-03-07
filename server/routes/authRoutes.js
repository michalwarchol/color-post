const {Router} = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/user/findById", userController.findUserById);
router.put("/user/addToFavourites", userController.addLikedPattern);
router.put("/user/removeFromFavourites", userController.removeLikedPattern);
router.post("/user/isPatternLiked", userController.isPatternLiked);
module.exports = router;