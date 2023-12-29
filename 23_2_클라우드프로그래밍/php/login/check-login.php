<?php
session_start();

if (isset($_SESSION['user_id'])) {
    $response = array('result' => 'ok', 'msg' => 'User is logged in', 'user_id' =>      $_SESSION['user_id']);
} else {
    $response = array('result' => 'error', 'msg' => 'User is not logged in');
}

header('Content-Type: application/json');
echo json_encode($response);
?>

