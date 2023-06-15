var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas2", function (req, res) {
    medidaController.buscarUltimasMedidas2(req, res);
});

router.get("/tempo-real2", function (req, res) {
    medidaController.buscarMedidasEmTempoReal2(req, res);
});

router.post("/votar", function (req, res) {
    medidaController.votar(req, res);
})

module.exports = router;