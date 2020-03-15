create database videclub;
use videclub;
--
create table copia(
id int primary key auto_increment,
formato enum('VHS','DVD'),
id_pelicula int not null,
constraint FK_pelicula foreign key (id_pelicula) references pelicula(id)
);
--
create table pelicula(
id int primary key auto_increment,
nombre varchar(255) unique not null,
descripcion varchar(510),
PEGI enum('3', '7', '12', '16', '18') not null,
genero varchar(255),
caratula blob,
tarifa enum('estrenos', 'estandar', 'antiguas') not null
);
--
create table director(
id int primary key auto_increment,
nombre varchar(255) not null,
apellidos varchar(255) not null,
fecha_nacimiento date not null
);
--
create table pelicula_director(
id_pelicula int not null,
id_director int not null,
constraint FK_id_pelicula foreign key (id_pelicula) references pelicula(id),
constraint FK_id_director foreign key (id_director) references director(id)
);
--
create table actor(
id int primary key auto_increment,
nombre varchar(255) not null,
apellidos varchar(255) not null,
fecha_nacimiento date not null
);
--
create table pelicula_actor(
id_pelicula int not null,
id_actor int not null,
constraint FK_id_pelicula_actor foreign key (id_pelicula) references pelicula(id),
constraint FK_id_actor foreign key (id_actor) references actor(id)
);
--
create table socio(
id int primary key auto_increment,
nombre varchar(255) not null,
apellidos varchar(255) not null,
fecha_nacimiento date not null,
telefono int not null
);
--
create table alquiler(
id_copia int not null,
id_socio int not null,
fecha_alquiler date not null,
fecha_devolucion date,
constraint FK_copia_alquiler foreign key (id_copia) references copia(id),
constraint FK_socio_alquiler foreign key (id_socio) references socio(id)
);
--
create table proveedor(
id int primary key auto_increment,
nombre varchar(255) not null,
NIF varchar(9) not null,
email varchar(255) not null,
telefono int not null
);
--
create table compras(
id_copia int not null,
id_proveedor int not null,
fecha date not null,
constraint FK_copia foreign key(id_copia) references copia(id),
constraint FK_proveedor foreign key(id_proveedor) references proveedor(id) 
);

create table valoraciones(
id_socio int not null,
id_pelicula int not null,
nota enum('1','2','3','4','5'),
comentario varchar(510),
constraint FK_socio foreign key (id_socio) references socio(id),
constraint FK_pelicula_rating foreign key (id_pelicula) references pelicula(id)
);


