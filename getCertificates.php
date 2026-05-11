<?php

require "db.php";

$sql = "
SELECT certificates.certifkey, clients.firstname, clients.lastname
FROM certificates
JOIN clients ON certificates.clients_id = clients.id
";

$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
?>