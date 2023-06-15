var database = require("../database/config")
var DadosEmail = null
var DadosCnpj = null
var senhaFuncglobal = null
var emailSessionAtual = null


function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function entrar(email, senha) {
    emailSessionAtual = email
    senhaFuncglobal = senha
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' and tipo = 'dono';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrar(nome, email, cpf, senha) { //cadastro do dono
    emailDono = email
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf);
    var instrucao = `
    INSERT INTO usuario (nomeUsuario,tipo, nivel_acesso, email, cpf, senha) VALUES ('${nome}', 'dono','total','${email}', '${cpf}' , '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar2(nomeEmpresa, cnpj, desc) { // cadastro da empresa
    DadosCnpj = cnpj
    DadosEmail = nomeEmpresa
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.");

    var instrucao2 = `
        INSERT INTO empresa (nome, cnpj, descricao) VALUES ('${nomeEmpresa}', '${cnpj}', '${desc}');
        `;
    database.executar(instrucao2)
    return ownerInComp()
}

function ownerInComp() {
    return new Promise(() => {
        database.executar('SELECT idUsuario FROM usuario ORDER BY idUsuario DESC LIMIT 1;')
            .then((rows) => {
                const idAtual = rows[0].idUsuario;

                // Executar outra consulta usando o idAtual
                return database.executar(`update usuario set fkEmpresa = (select idEmpresa from empresa where nome = '${DadosEmail}' and cnpj = '${DadosCnpj}') where idUsuario =  ${idAtual};`);
            })
    }
    )
};

function Funcionario(nomeFunc, funcaoFunc, nivelAcessoFunc, emailFunc, senhaFunc, cpfFunc) {
    senhaFuncglobal = senhaFuncglobal
    var instrucao = `
    INSERT INTO usuario (nomeUsuario, tipo, nivel_acesso, email, senha, cpf) VALUES ('${nomeFunc}', '${funcaoFunc}', '${nivelAcessoFunc}' ,'${emailFunc}', '${senhaFunc}', '${cpfFunc}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return setTimeout(function () {
        employeeInComp();
    }, 2000), database.executar(instrucao);
}

function employeeInComp() {
    return new Promise(() => {
        database.executar(`
                SELECT idEmpresa FROM empresa JOIN usuario
                ON empresa.idEmpresa = usuario.fkEmpresa
                WHERE usuario.tipo = 'dono' AND usuario.email = '${emailSessionAtual}'
              `)
            .then((rows) => {
                const idEmpresa = rows[0].idEmpresa;

                database.executar(`SELECT idUsuario FROM usuario ORDER BY idUsuario DESC LIMIT 1;`)
                    .then((rows) => {
                        const idAtual = rows[0].idUsuario;
                        return database.executar(`
                UPDATE usuario SET fkEmpresa = ${idEmpresa} WHERE idUsuario = ${idAtual};
                `);
                    })
            })
        // Executar outra consulta usando o idAtual
    }
    )
}
function exportFkEmpresa(){
    return emailSessionAtual
}

/* select funcionarios*/

function plotar_funcionario() {
    console.log("Iremos fazer o select funcionarios");
    var instrucao = `
    SELECT tipo, nomeUsuario as nome, cpf, nivel_acesso as nivel FROM usuario where fkEmpresa = ( select idEmpresa from empresa join usuario
        on empresa.idEmpresa = usuario.fkEmpresa
            where email = "${emailSessionAtual}") 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/* select empresa*/
function plotar_empresa() {
    console.log("Iremos fazer o select empresa");
    var instrucao = `
    SELECT nome, cnpj, descricao FROM empresa WHERE idEmpresa = (select idEmpresa from empresa join usuario
        on empresa.idEmpresa = usuario.fkEmpresa
            where email = "${emailSessionAtual}");
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


/* select empresa*/
function plotar_usuario() {
    console.log("Iremos fazer o select empresa");
    var instrucao = `
    SELECT e.nome, e.cnpj, e.descricao, u.tipo, u.nomeUsuario, u.cpf, u.nivel_acesso as 'nivel', u.email, u.senha  FROM empresa e
        INNER JOIN usuario u ON u.fkEmpresa = e.idEmpresa
            WHERE idEmpresa = (select idEmpresa from empresa join usuario on empresa.idEmpresa = usuario.fkEmpresa where email = "${emailSessionAtual}");
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    entrar,
    cadastrar,
    cadastrar2,
    listar,
    plotar_empresa,
    plotar_funcionario,
    Funcionario,
    plotar_usuario,
    exportFkEmpresa: exportFkEmpresa
};



