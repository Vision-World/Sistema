var database = require("../database/config");


function buscarUltimasMedidas2() {
    instrucaoSql2 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql2 = ""

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql2 = `SELECT COUNT(v.fkBanner) votos,
        p.nome
        FROM votacao v 
        JOIN banner b
        ON v.fkBanner = b.idBanner
        JOIN personagem p
        ON b.fkPersonagem = p.idPersonagem
        GROUP BY v.fkBanner
        ORDER BY COUNT(v.fkBanner) DESC;`

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);

}


function buscarMedidasEmTempoReal2() {
    instrucaoSql2 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql2 = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql2 = `SELECT COUNT(v.fkBanner) votos,
        p.nome
        FROM votacao v 
        JOIN banner b
        ON v.fkBanner = b.idBanner
        JOIN personagem p
        ON b.fkPersonagem = p.idPersonagem
        GROUP BY v.fkBanner
        ORDER BY COUNT(v.fkBanner) DESC;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);
}

function votar(escolhaUsuario, idUser) {
    console.log("ACESSEI O INGRESSO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", escolhaUsuario, idUser);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO votacao (fkBanner, fkUsuario)
        SELECT fkPersonagem, '${idUser}'
        FROM banner 
        JOIN personagem ON fkPersonagem = idPersonagem
        WHERE nome = '${escolhaUsuario}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
 


module.exports = {
    buscarMedidasEmTempoReal2,
    buscarUltimasMedidas2,
    votar
}
