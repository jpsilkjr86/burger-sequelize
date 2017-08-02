CREATE DATABASE IF NOT EXISTS burger_db;

USE burger_db;

CREATE TABLE burgers (
	id INT AUTO_INCREMENT,
	burger_name VARCHAR(255) NOT NULL,
	devoured BOOLEAN DEFAULT FALSE,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);