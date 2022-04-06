var express = require("express");
var router = express.Router();


// Controller 
var salarie_controller = require("../controllers/salarie");

router.get("/", salarie_controller.getAll);

router.get("/:id", salarie_controller.getById);

router.post("/", salarie_controller.create);

router.put("/:id", salarie_controller.update);

router.delete("/:id", salarie_controller.delete);


module.exports = router;