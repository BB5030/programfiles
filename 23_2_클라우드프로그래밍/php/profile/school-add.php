<?php
include ('database.php');
$response = array('result' => 'error', 'msg' => 'error');

if (isset($_POST['school'])) {
    $school = $_POST['school'];
    $period = $_POST['period'];
    $major = $_POST['major'];
    $query = "INSERT into school(school, period, major) VALUES ('$school', '$period', '$major')";
    $result = mysqli_query ($connection, $query);

    if (! $result) {
        die('Query Failed.');
    }

    $response = array('result' => 'ok', 'msg' => 'ok');
}

header('Content-Type: application/json');
echo json_encode($response);
?>
