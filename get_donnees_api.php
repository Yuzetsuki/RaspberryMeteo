<?php
// Connexion à la base de données
$host = 'localhost'; // Adresse du serveur
$dbname = 'MeteoDB'; // Nom de la base de données
$username = 'root'; // Utilisateur de la base de données
$password = 'P@ssw0rd'; // Mot de passe de la base de données

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
