<?php

// Incluir el archivo de conexión a la base de datos
include 'database.php';

// Datos del formulario (debe pasarse en el cuerpo de la solicitud POST)
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$idDocumento = $request->idDocumento;

// Actualizar el estado del proyecto en la base de datos
$consulta = "UPDATE Documentos SET Estado = 'Rechazado' WHERE idDocumento = $idDocumento";

if (mysqli_query($con, $consulta)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
}

$con->close();

?>
