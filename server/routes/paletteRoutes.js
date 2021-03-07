const {Router} = require("express");
const {requireAuth} =require("../middleware/authMiddleware");
const paletteController = require("../controllers/paletteController");

const router = Router();

router.use("/create", requireAuth);
router.use("/incrementLikes", requireAuth);
router.use("/decrementLikes", requireAuth);

router.post("/create", paletteController.create);
router.post("/findById", paletteController.findById);
router.get("/findAll", paletteController.findAll);
router.get("/findLatest", paletteController.findLatest);
router.get("/findPopular", paletteController.findMostPopular);
router.put("/incrementLikes", paletteController.incrementLikes);
router.put("/decrementLikes", paletteController.decrementLikes);

module.exports = router;