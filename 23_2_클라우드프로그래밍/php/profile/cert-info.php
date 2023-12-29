<?php
include ('database.php');

$query = "SELECT * from cert";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Query Failed' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'idx' => $row['idx'],
        'cert' => $row['cert'],
        'grade' => $row['grade'],
        'authority' => $row['authority']
    );
}
$jsonstring = json_encode($json);
echo $jsonstring;
?>
