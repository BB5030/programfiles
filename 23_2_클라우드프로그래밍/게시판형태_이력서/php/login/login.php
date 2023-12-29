<?php 
include ('database.php');

session_start();

$query = "SELECT id, password FROM user WHERE idx = 1";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Query Failed' . mysqli_error($connection));
}

$row = mysqli_fetch_assoc($result);

$id = isset($_POST['id']) ? $_POST['id'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if ($id === $row['id'] && $password === $row['password']) {
    $_SESSION['user_id'] = $row['id']; 
    $response = array('result' => 'ok', 'msg' => '로그인 되었습니다');
} else {
    session_destroy();
    if($id != $row['id']){
        $response = array('result' => 'error', 'msg' => '잘못된 id입니다');
    }
    else{
        $response = array('result' => 'error', 'msg' => '잘못된 비밀번호입니다');
    }
}


header('Content-Type: application/json');
echo json_encode($response);
?>
