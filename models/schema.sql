DROP DATABASE IF EXISTS usersdb;
CREATE DATABASE usersdb;

USE usersdb;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    password VARCHAR(50) NULL,
    logged_in BOOLEAN NOT NULL DEFAULT 1,
    PRIMARY KEY(id)
);

INSERT INTO users (username, password)
VALUES ("Desinoelle", "Cleo");
