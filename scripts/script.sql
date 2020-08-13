CREATE DATABASE que_veo_hoy;

USE que_veo_hoy;

CREATE TABLE pelicula (
    id int NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion int(5),
    director VARCHAR(400),
    anio INT(5),
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700),
    PRIMARY KEY (id) 
);

source scripts/script-paso-1-peliculas.sql;

CREATE TABLE genero (
    id int NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30),
    PRIMARY key (id)
);

ALTER TABLE pelicula ADD COLUMN genero_id INT;

ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

source scripts/script-paso-2-generos.sql;

CREATE TABLE actor (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(70),
    PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    actor_id INT NOT NULL,
    pelicula_id INT NOT NULL,
    PRIMARY KEY (id)
);

source scripts/script-paso-3-actores.sql;

ALTER TABLE actor_pelicula  ADD FOREIGN KEY (actor_id) REFERENCES actor (id);

ALTER TABLE actor_pelicula  ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula (id);