const {Router} = require("express");
const paletteController = require("../controllers/paletteController");

const router = Router();

router.post("/create", paletteController.create);
router.post("/findById", paletteController.findById);
router.get("/findAll", paletteController.findAll);

module.exports = router;