drop database if exists videoclub;
create database videoclub;
use videoclub;

create table genero(
id_genero tinyint unsigned primary key auto_increment,
nombre varchar(50) unique not null
);

create table tarifa(
id_tarifa tinyint unsigned primary key auto_increment,
name varchar(25) unique not null,
precio decimal(5,2) not null
); 

create table elenco(
id_elenco int unsigned primary key auto_increment,
nombre varchar(50) not null,
apellido varchar(50) not null,
fecha_nacimiento date not null
);

create table pelicula(
id_pelicula int unsigned primary key auto_increment,
id_tarifa tinyint unsigned not null,
nombre varchar(255) unique not null,
descripcion text,
PEGI enum('3', '7', '12', '16', '18') not null,
fecha_publicacion date not null,
caratula varchar(255) default null,
constraint FK_pelicula_tarifa foreign key(id_tarifa) references tarifa(id_tarifa)
);

create table pelicula_genero(
id_pelicula int unsigned not null,
id_genero tinyint unsigned not null,
constraint FK_pelicula_genero_pelicula foreign key (id_pelicula) references pelicula(id_pelicula),
constraint Fk_pelicula_genero_genero foreign key (id_genero) references genero(id_genero)
);

create table pelicula_elenco(
id_pelicula int unsigned not null,
id_elenco int unsigned not null,
tipo_elenco enum ('Director/a','Actor/Actriz'),
primary key (id_pelicula, id_elenco, tipo_elenco),
constraint FK_pelicula_elenco_pelicula foreign key(id_pelicula) references pelicula(id_pelicula),
constraint FK_pelicula_elenco_elenco foreign key(id_elenco) references elenco(id_elenco)
);

create table copia(
id_copia int unsigned primary key auto_increment,
id_pelicula int unsigned not null,
formato enum('VHS','DVD'),
constraint FK_copia_pelicula foreign key (id_pelicula) references pelicula(id_pelicula)
);

create table proveedor(
id_proveedor int unsigned primary key auto_increment,
nombre varchar(255) not null,
NIF varchar(9) not null,
email varchar(255) not null,
telefono int unsigned not null
);


create table compra(
id_compra int unsigned primary key auto_increment,
id_copia int unsigned not null,
id_proveedor int unsigned not null,
fecha date not null,
constraint FK_compras_copia foreign key(id_copia) references copia(id_copia),
constraint FK_compras_proveedor foreign key(id_proveedor) references proveedor(id_proveedor) 
);


create table socio(
id_socio int unsigned primary key auto_increment,
nombre varchar(255) not null,
apellidos varchar(255) not null,
fecha_nacimiento date not null,
email varchar(255) not null,
telefono int not null,
activo tinyint not null default 0
);

create table alquiler(
id_alquiler int unsigned primary key auto_increment,
id_copia int unsigned not null,
id_socio int unsigned not null,
fecha_alquiler timestamp not null,
fecha_devolucion timestamp,
constraint FK_alquiler_copia foreign key (id_copia) references copia(id_copia),
constraint FK_alquiler_socio foreign key (id_socio) references socio(id_socio)
);

create table rating(
id_socio int unsigned not null,
id_pelicula int unsigned not null,
nota enum('1','2','3','4','5'),
comentario text,
fecha timestamp not null,
primary key (id_socio, id_pelicula),
constraint FK_rating_socio foreign key (id_socio) references socio(id_socio),
constraint FK_rating_pelicula foreign key (id_pelicula) references pelicula(id_pelicula)
);

-- Inserts para ejemplos de las tablas

-- Genero
insert into genero (nombre) values ('Clasico');
insert into genero (nombre) values ('Mudo');
insert into genero (nombre) values ('Blanco y negro');
insert into genero (nombre) values ('Accion');
insert into genero (nombre) values ('Aventuras');
insert into genero (nombre) values ('Comedia');
insert into genero (nombre) values ('Drama');
insert into genero (nombre) values ('Terror');
insert into genero (nombre) values ('Musical');
insert into genero (nombre) values ('Ciencia ficcion');
insert into genero (nombre) values ('Western');
insert into genero (nombre) values ('Thriller');
insert into genero (nombre) values ('Infantil');
select * from genero order by id_genero;

--  Tarifas
insert into tarifa (name, precio) values('Estrenos',3.50);
insert into tarifa (name, precio) values('Estandar',2.00);
insert into tarifa (name, precio) values('Antiguas',1.20);
select * from tarifa;