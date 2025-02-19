<?php
require_once "database.php"; // fichier de connexion à la base de données

try {

    // Requête SQL pour récupérer les 6 dernières lignes
    $sql = "SELECT date, heure, temperature, humidity, pressure FROM DonneesMeteo ORDER BY id DESC LIMIT 6";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Récupérer les résultats
    $donnees = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les données au format JSON
    echo json_encode($donnees);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
