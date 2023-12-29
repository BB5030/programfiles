<?php
session_start();

if (isset($_SESSION['user_id'])) {
    session_destroy();
    $response = array('result' => 'ok', 'msg' => '로그아웃 되었습니다');
} else {
    $response = array('result' => 'error', 'msg' => 'User is not logged in');
}

header('Content-Type: application/json');
echo json_encode($response);
?>

