create table usuario (
 	id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(300) not null,
    data_nascimento varchar(10),
    genero varchar(20),
    email varchar(70),
    senha varchar(50)
);