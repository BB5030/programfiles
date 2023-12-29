<?php
header("Access-Control-Allow-Origin: *");
$mysql_host = "mysql";
$mysql_user = "bb";
$mysql_password = "123456";
$mysql_db = "projectDB";


$connection = mysqli_connect(
    $mysql_host, $mysql_user, $mysql_password, $mysql_db
);
?>
