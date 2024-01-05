create table livro (
 	id int PRIMARY KEY AUTO_INCREMENT,
    titulo varchar(300) not null,
    autor varchar(300),
    data_lancamento date,
    genero varchar(30)
);