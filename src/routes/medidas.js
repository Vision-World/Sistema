var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/ultimas2", function (req, res) {
    medidaController.buscarUltimasMedidas2(req, res);
});

router.get("/tempo-real2", function (req, res) {
    medidaController.buscarMedidasEmTempoReal2(req, res);
});

router.get("/medidasDonnut", function (req, res) {
    medidaController.buscarUltimasMedidasDonnut(req, res);
});

router.get("/medidasTempoRealDonnut", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDonnut(req, res);
});

router.post("/cadastrar_tomate", function(req, res){
    medidaController.cadastrar_tomate(req, res); 
})

module.exports = router;