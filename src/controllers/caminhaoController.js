var caminhaoModel = require("../models/caminhaoModel");

function cadastrar(req, res){
    var marca = req.body.marcaServer;
    var placa = req.body.placaServer;
    var tipo = req.body.tipoCaminhaoServer;
    var sensor = req.body.sensorServer;

    if(marca == undefined){
        res.status(400).send("Sua marca está undefined!");
    }else if(placa == undefined){
        res.status(400).send("Sua placa está undefined!");
    }else if(tipo == undefined){
        res.status(400).send("Seu tipo Caminhão está undefined!");
    }else if (sensor == undefined){
        res.status(400).send("Seu tipo sensor está undefined!");
    }else{
        caminhaoModel.cadastrar(placa, marca, tipo, sensor)
            .then(
                function(resultado){
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function viagem(req, res){
    var fk_caminhao = req.body.fk_caminhaoServer;
    var fk_motorista = req.body.fk_motoristaServer;
    var fk_remessa = req.body.fk_remessaServer;

    if(fk_caminhao == undefined){
        res.status(400).send("Seu caminhao está undefined!");
    }else if(fk_motorista == undefined){
        res.status(400).send("Seu motorista está undefined!");
    }else if(fk_remessa == undefined){
        res.status(400).send("Sua remessa está undefined!");
    }
    else{
        caminhaoModel.viagem(fk_caminhao, fk_motorista, fk_remessa)
        .then(
            function(resultado){
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da viagem! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}
function motorista(req, res){
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var dtNascto = req.body.dtNasctoServer;
    var cnh = req.body.cnhServer;

    if(nome == undefined){
        res.status(400).send("Seu nome está undefined")
    }else if(cpf == undefined){
        res.status(400).send("Seu cpf está undefined")
    }else if(dtNascto == undefined){
        res.status(400).send("Sua data de nascimento está undefined");
    }else if(cnh == undefined){
        res.status(400).send("Sua cnh está undefined");
    }else{
        caminhaoModel.motorista(nome, cpf, dtNascto, cnh)
            .then(
                function (resultado){
                    res.json(resultado)
                }
            ).catch(function (error){
                res.json(error)
                console.log(error.sqlMessage)
                res.status(500).json(error.sqlMessage);
            });
    }
}

function plotar_caminhao(req, res) {
    caminhaoModel.plotar_caminhao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function plotar_viagem(req, res){
    caminhaoModel.plotar_viagem()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
            
}
function plotar_remessa(req, res) {
    caminhaoModel.plotar_remessa()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function plotar_motorista(req, res) {
    caminhaoModel.plotar_motorista()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function plotar_dadoscaminhao(req, res) {
    caminhaoModel.plotar_dadoscaminhao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    viagem,
    motorista,
    plotar_caminhao,
    plotar_dadoscaminhao,
    plotar_motorista,
    plotar_remessa,
    plotar_viagem
}