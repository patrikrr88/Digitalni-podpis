CREATE SCHEMA IF NOT EXISTS signum
DEFAULT CHARACTER SET utf8
COLLATE utf8_czech_ci;

USE signum;

CREATE TABLE clients (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  birthdate DATE NOT NULL,
  street VARCHAR(45),
  housenum VARCHAR(10) NOT NULL,
  postal VARCHAR(5) NOT NULL,
  city VARCHAR(60) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email),
  UNIQUE KEY phone_UNIQUE (phone)
);

CREATE TABLE certificates (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  clients_id INT UNSIGNED NOT NULL,
  certifkey VARCHAR(128) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY certifkey_UNIQUE (certifkey),
  FOREIGN KEY (clients_id) REFERENCES clients(id)
);