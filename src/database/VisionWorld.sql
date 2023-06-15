CREATE DATABASE visionWord;

drop database visionWord;

USE visionWord;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
sobrenome VARCHAR(45),
cpf CHAR(14),
dtNasc DATE,
nickname VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45)
);

SELECT * FROM usuario;

CREATE TABLE personagem (
idPersonagem INT PRIMARY KEY auto_increment,
nome VARCHAR(45),
tipo VARCHAR(45)
);

INSERT INTO personagem VALUES 
	(NULL, 'Venti', 'Anemo'),
    (NULL, 'Albedo', 'Geo'),
    (NULL, 'Klee', 'Pyro'),
    (NULL, 'Alhaitham', 'Dendro'),
    (NULL, 'Andarilho', 'Anemo'),
    (NULL, 'Itto', 'Geo'),
    (NULL, 'Baizhu', 'Dendro'),
    (NULL, 'Cyno', 'Electro'),
    (NULL, 'Dehya', 'Pyro'),
    (NULL, 'Eula', 'Cryo'),
    (NULL, 'Ganyu', 'Cryo'),
    (NULL, 'Hutao', 'Pyro'),
    (NULL, 'Kazuha', 'Anemo'),
    (NULL, 'Ayaka', 'Cryo'),
    (NULL, 'Ayato', 'Hydro'),
    (NULL, 'Nahida', 'Dendro'),
    (NULL, 'Nilou', 'Hydro'),
    (NULL, 'Kokomi', 'Hydro'),
    (NULL, 'Shenhe', 'Cryo'),
    (NULL, 'Raiden', 'Electro'),
    (NULL, 'Tartaglia', 'Hydro'),
    (NULL, 'Tighnari', 'Dendro'),
    (NULL, 'Xiao', 'Anemo'),
    (NULL, 'Miko', 'Electro'),
    (NULL, 'Yelan', 'Hydro'),
    (NULL, 'Yoimiya', 'Pyro'),
    (NULL, 'Zhongli', 'Geo');
    
CREATE TABLE banner (
idBanner INT PRIMARY KEY AUTO_INCREMENT,
fkPersonagem INT,
foreign key (fkPersonagem) REFERENCES personagem(idPersonagem)
);

INSERT INTO banner VALUES
	(null, 1),
    (null, 2),
    (null, 3),
    (null, 4),
    (null, 5),
    (null, 6),
    (null, 7),
    (null, 8),
    (null, 9),
    (null, 10),
    (null, 11),
    (null, 12),
    (null, 13),
    (null, 14),
    (null, 15),
    (null, 16),
    (null, 17),
    (null, 18),
    (null, 19),
    (null, 20),
    (null, 21),
    (null, 22),
    (null, 23),
    (null, 24),
    (null, 25),
    (null, 26),
    (null, 27);
    

CREATE TABLE votacao (
idVotacao INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario int,
foreign key (fkUsuario) REFERENCES usuario(idUsuario),
fkBanner INT,
foreign key (fkBanner) REFERENCES banner(idBanner)
);

select * from banner right join personagem on fkPersonagem = idPersonagem;

select * from votacao;