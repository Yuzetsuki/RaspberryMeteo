<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'MeteoDB';
$username = 'root';
$password = 'P@ssw0rd';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
