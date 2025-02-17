<?php
// Connexion à la base de données
$host = "localhost";
$dbname = "MeteoDB";
$user = "root";  // Mets ton utilisateur MySQL
$password = "P@ssw0rd";  // Mets ton mot de passe MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer la dernière ligne des données du capteur
    $stmt = $pdo->query("SELECT temperature, humidity, pressure FROM DonneesMeteo ORDER BY id DESC LIMIT 1");
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retourner les données en JSON
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
}
?>
