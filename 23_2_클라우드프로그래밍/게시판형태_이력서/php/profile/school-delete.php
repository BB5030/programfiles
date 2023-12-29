<?php
include ('database.php');
$response = array('result' => 'error', 'msg' => 'error');

if (isset($_POST['idx'])) {
    $idx = $_POST['idx'];
    $query = "DELETE FROM school WHERE idx = $idx";
    $result = mysqli_query($connection, $query);

    if (! $result) {
        die('Query Failed.');
    }
    $response = array('result' => 'ok', 'msg' => 'ok');
}

header('Content-Type: application/json');
echo json_encode($response);
?>
