var express = require("express");
var router = express.Router();


// Controller 
var entreprise_controller = require("../controllers/entreprise");

router.get("/", entreprise_controller.getAll);

router.get("/:id", entreprise_controller.getById);

router.post("/", entreprise_controller.create);

router.put("/:id", entreprise_controller.update);

router.delete("/:id", entreprise_controller.delete);


module.exports = router;