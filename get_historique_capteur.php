<?php
// Connexion à la base de données
$host = 'localhost'; // hôte
$dbname = 'MeteoDB'; // nom de la base de données
$username = 'root'; // utilisateur
$password = 'P@ssw0rd'; // mot de passe

try {
    // Créer une connexion PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configurer l'erreur PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
