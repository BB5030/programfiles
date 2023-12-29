<?php
include('database.php');

$query = "SELECT name, phone, email FROM user WHERE idx = 1"; 
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Query Failed' . mysqli_error($connection));
}

while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'name' => $row['name'],
        'phone' => $row['phone'],
        'email' => $row['email']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>

