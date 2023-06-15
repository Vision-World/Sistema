var database = require("../database/config");

function cadastrar(placa, marca, tipo, sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
    INSERT INTO caminhao (marca, placa, tipoCaminhao, sensor) VALUES ('${marca}', '${placa}', '${tipo}' , '${sensor}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao)
    setTimeout(()=>
    caminhaoComComp(), 2000);
    return  database.executar('select * from caminhao')


}
function caminhaoComComp() {
    return new Promise(() => {
        database.executar(`
        SELECT idCaminhao FROM caminhao ORDER BY idCaminhao DESC LIMIT 1;
              `)
            .then((rows) => {
                const idCaminhao = rows[0].idCaminhao;
                return database.executar(`
                        update caminhao set fk_idEmpresa = (
                            select idEmpresa from empresa join usuario
                        on empresa.idEmpresa = usuario.fkEmpresa
                            where email ='${require("./usuarioModel").exportFkEmpresa()}'
                        ) where idCaminhao = ${idCaminhao};
                `);
            })
        // Executar outra consulta usando o idAtual
    }
    )
}

function viagem(fk_caminhao, fk_motorista, fk_remessa) {
    var instrucao =
        `
    insert into viagem values
        (null, ${fk_caminhao}, ${fk_motorista}, ${fk_remessa}, now())
        `
    console.log(instrucao)
    return database.executar(instrucao)
}

function motorista(nome, cpf, dtNascto, cnh) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao =
        `
    insert into motorista (nome, cpf , dtNascto ,cnh)  values
        ('${nome}', '${cpf}', '${dtNascto}','${cnh}');
    `
    console.log(instrucao)
    //                        _ _
    //                      _-_-_-_
    //                      | . . |
    //    console.log(`AQUI |+>-<+| ${fkEmpresa.exportFkEmpresa()}`) 
    return database.executar(instrucao)
}

/* mostrar caminhao*/
function plotar_caminhao() {
    console.log("Iremos fazer o select funcionarios");
    var instrucao = `
    select marca, placa, tipoCaminhao, sensor from caminhao where fk_idEmpresa = (
        select idEmpresa from empresa join usuario
    on empresa.idEmpresa = usuario.fkEmpresa
        where email = "${require("./usuarioModel").exportFkEmpresa()}")
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function plotar_dadoscaminhao() {
    var instrucao = `select idCaminhao, placa from caminhao;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotar_motorista() {
    var instrucao = `select nome, cpf, dtNascto as 'data',cnh from motorista;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotar_remessa() {
    var instrucao = `select qtd_tomate, valor from remessa;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotar_viagem(){
    var instrucao = `
    select motorista.nome, caminhao.placa, remessa.qtd_tomate from viagem
	join caminhao 
		on viagem.fk_caminhao = caminhao.idCaminhao
			join motorista
				on viagem.fk_motorista = motorista.idMotorista
					join remessa
						on viagem.fk_remessa = remessa.idRemessa`
    return database.executar(instrucao);
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