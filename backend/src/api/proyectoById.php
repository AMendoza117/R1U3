<?php

include 'database.php';

$idProyecto = $_GET['idProyecto']; 

$consulta = "SELECT nameProject, initialDate, finisDate, r.nameRespo AS responsible
             FROM projects AS p
             INNER JOIN responsible AS r ON p.idResponsible = r.idResonsible
             WHERE p.idProject = $idProyecto";

$resultado = mysqli_query($con, $consulta);

if ($resultado) {
    $proyecto = mysqli_fetch_assoc($resultado);
    echo json_encode(['success' => true, 'data' => $proyecto]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
