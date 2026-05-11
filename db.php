<?php

$conn = new mysqli("localhost", "root", "", "signum");

if ($conn->connect_error) {
  die("DB error");
}

$conn->set_charset("utf8");
?>