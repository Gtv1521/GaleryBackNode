create database dataImagenes;
use dataImagenes;

create table usuarios (
    id_user int(11) not null auto_increment primary key,
    nombre_user varchar(255) not null,
    password varchar(80) not null,
    email varchar(255) not null,
    userName varchar(255) not null
);

create table imagenes (
    id_img int(11) not null auto_increment primary key,
    name_img varchar(255) not null,
    description_img varchar(255) not null,
    url_img varchar(255) not null,
    id_url varchar(255) not null,
    user_id_img int(11) not null,
    fecha date  not null,
    album_id int(11) not null,
    foreign key (user_id_img) references usuarios (id_user),
    foreign key (album_id) references albums (id_album)
);


create table albums( 
    id_album int(11) not null auto_increment primary key,  
    nombre_album varchar (60) not null,
    user_id int(11) not null,
    foreign key (user_id) references usuarios (id_user)
);
