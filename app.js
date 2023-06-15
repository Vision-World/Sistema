process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
const nodemailer = require('nodemailer');
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var usuarioRouter = require("./src/routes/usuarios");
var caminhaoRouter = require("./src/routes/caminhao")
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/usuarios", usuarioRouter);
app.use("/caminhaos", caminhaoRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter)

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}/login/index.html \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendEmail', (req, res) => {
    const { name, email, select, message, attachmentData } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'winyciosnascimento31@gmail.com', // generated ethereal user
            pass: 'nhlsqzisunovwzri',
        }
    });


    const mailOptions = {
        from: 'winyciosnascimento31@gmail.com',
        to: 'support@sealsolution.atlassian.net',
        subject: select,
        html: `<p>Olá meu nome é ${name}</p> 
        \n\n\n\n,
        <p>Mensagem : ${message} </p> 
        \n\n\n\n 
        <p> Email: ${email}</p> 
        `,
        attachments: [{
            path: attachmentData,
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Ocorreu um erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Email enviado com sucesso!');
        }
    });
});

