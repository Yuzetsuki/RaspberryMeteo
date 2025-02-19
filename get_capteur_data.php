<?php
require_once "database.php"; // fichier de connexion à la base de données

try {

    // Récupérer la dernière ligne des données du capteur
    $stmt = $pdo->query("SELECT temperature, humidity, pressure FROM DonneesMeteo ORDER BY id DESC LIMIT 1");
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retourner les données en JSON
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
}
?>
