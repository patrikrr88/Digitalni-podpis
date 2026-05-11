<?php

$conn = new mysqli("localhost", "root", "", "signum");

if ($conn->connect_error) {
  die("DB error");
}

$conn->set_charset("utf8");

$conn->query("
INSERT INTO clients (firstname, lastname, birthdate, street, housenum, postal, city, phone, email)
VALUES
('Jan', 'Novák', '2000-01-01', 'Hlavní', '12', '40501', 'Děčín', '777111222', 'jan.novak@test.cz'),
('Petr', 'Svoboda', '1998-05-10', 'Dlouhá', '8', '40502', 'Děčín', '777333444', 'petr.svoboda@test.cz')
");

$conn->query("
INSERT INTO certificates (clients_id, certifkey)
VALUES
(1, 'CERT-ABC-123-XYZ'),
(2, 'CERT-DEF-456-UVW')
");

echo "OK - data vložena";
?>