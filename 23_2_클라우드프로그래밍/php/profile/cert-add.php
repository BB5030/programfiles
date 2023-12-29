<?php
include ('database.php');
$response = array('result' => 'error', 'msg' => 'error');

if (isset($_POST['cert'])) {
    $cert = $_POST['cert'];
    $grade = $_POST['grade'];
    $authority = $_POST['authority'];
    $query = "INSERT into cert(cert, grade, authority) VALUES ('$cert', '$grade', '$authority')";
    $result = mysqli_query ($connection, $query);

    if (! $result) {
        die('Query Failed.');
    }

    $response = array('result' => 'ok', 'msg' => 'ok');
}

header('Content-Type: application/json');
echo json_encode($response);
?>
