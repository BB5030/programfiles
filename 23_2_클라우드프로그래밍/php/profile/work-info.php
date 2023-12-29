<?php
include ('database.php');

$query = "SELECT * from workex";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Query Failed' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'idx' => $row['idx'],
        'company' => $row['company'],
        'period' => $row['period'],
        'position' => $row['position'],
        'description' => $row['description']
    );
}
$jsonstring = json_encode($json);
echo $jsonstring;
?>
