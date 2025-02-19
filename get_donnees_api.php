<?php
require_once "database.php"; // fichier de connexion à la base de données

try {

    // Récupérer les 6 dernières lignes de DonneesAPI
    $stmt = $pdo->prepare("SELECT temperature, humidity, pressure, temp_feels_like, weather_main FROM DonneesAPI ORDER BY date DESC, heure DESC LIMIT 1");
    $stmt->execute();

    // Récupérer les résultats
    $donnees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir les résultats en JSON
    echo json_encode($donnees);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
