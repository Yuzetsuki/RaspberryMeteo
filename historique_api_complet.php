<?php
require_once "database.php"; // fichier de connexion à la base de données

try {

    // Récupérer les 100 dernières entrées
    $stmt = $pdo->prepare("SELECT date, heure, temperature, humidity, pressure, weather_main FROM DonneesAPI ORDER BY date DESC, heure DESC LIMIT 100");
    $stmt->execute();

    // Récupérer les résultats
    $donnees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir les résultats en JSON
    echo json_encode($donnees);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
