var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
        umidade as umidade,
        dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico 
                        from dadossensor join sensor on fk_idSensor = idSensor order by idSensor desc limit 14;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
        umidade as umidade,
        dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico 
                        from dadossensor join sensor on fk_idSensor = idSensor order by idSensor desc limit 14;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidas2() {
    instrucaoSql2 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql2 = ""

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql2 = `select (qtd_tomate * valor) * 0.05 as perda, (select qtd_tomate * valor) as total from remessa join viagem on fk_remessa = idRemessa order by idRemessa desc limit 1`

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
        instrucaoSql2 = `select (qtd_tomate * valor) * 0.05 as perda, (select qtd_tomate * valor) as total from remessa join viagem on fk_remessa = idRemessa order by idRemessa desc limit 1`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);
}

    function buscarUltimasMedidasDonnut(limite_linhas) {
        instrucaoSql2 = ''

        if (process.env.AMBIENTE_PROCESSO == "producao") {
            instrucaoSql2 = `select top ${limite_linhas}
            dht11_temperatura as temperatura, 
            dht11_umidade as umidade,  
                    momento,
                    FORMAT(momento, 'HH:mm:ss') as momento_grafico
                from medida`;
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            instrucaoSql2 = `select qtd_tomate * 0.05 as perda, (select qtd_tomate) as mantidos from  remessa join viagem on fk_remessa = idRemessa order by idRemessa desc limit 1;`
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
        }
        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);

    }

function buscarMedidasEmTempoRealDonnut(limite_linhas) {
    instrucaoSql2 = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql2 = `select top 1 ${limite_linhas}
    dht11_temperatura as temperatura, 
    dht11_umidade as umidade,  
                    CONVERT(varchar, momento, 108) as momento_grafico, 
                order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql2 = `select qtd_tomate * 0.05 as perda, (select qtd_tomate) as mantidos from  remessa join viagem on fk_remessa = idRemessa order by idRemessa desc limit 1;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);
}

function cadastrar_tomate(quantidade, preco) {
    console.log("ACESSEI O medida MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", quantidade, preco);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO remessa (qtd_tomate, valor) VALUES ('${quantidade}', '${preco}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasEmTempoReal2,
    buscarUltimasMedidas2,
    buscarMedidasEmTempoRealDonnut,
    buscarUltimasMedidasDonnut,
    cadastrar_tomate
}
