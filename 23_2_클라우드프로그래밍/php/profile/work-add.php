<?php
include ('database.php');

$response = array('result' => 'error', 'msg' => 'error');


if (isset($_POST['company'])) {
    $period = $_POST['period'];
    $company = $_POST['company'];
    $position = $_POST['position'];
    $description = $_POST['description'];
    $query = "INSERT into workex(company, period, position, description) VALUES ('$company', '$period', '$position', '$description')";
    $result = mysqli_query ($connection, $query);

    if (! $result) {
        die('Query Failed.');
    }

    $response = array('result' => 'ok', 'msg' => 'ok');
}
    
header('Content-Type: application/json');
echo json_encode($response);
?>
