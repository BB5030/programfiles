<?php
include ('database.php');

$query = "SELECT * from school";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Query Failed' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'idx' => $row['idx'],
        'period' => $row['period'],
        'shcool' => $row['school'],
        'major' => $row['major']
    );
}
$jsonstring = json_encode($json);
echo $jsonstring;
?>
