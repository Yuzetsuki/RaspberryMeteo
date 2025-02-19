<?php
require_once "database.php"; // fichier de connexion à la base de données

try {

    // Récupérer les 10 dernières entrées pour l'historique
    $stmt = $pdo->prepare("SELECT date, heure, temperature, humidity, pressure, weather_main 
                           FROM DonneesAPI 
                           ORDER BY date DESC, heure DESC 
                           LIMIT 6");
    $stmt->execute();

    $donnees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($donnees); // Convertir en JSON
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
