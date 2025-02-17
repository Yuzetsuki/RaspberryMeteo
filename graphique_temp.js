async function afficherGraphiqueTemp() {
    try {
        const response = await fetch('historique_api_complet.php');  // Récupérer les données depuis l'API
        const donnees = await response.json();

        // On ne garde que les 6 dernières entrées
        const dernieresDonnees = donnees.slice(0, 6);

        // Préparation des données pour le graphique
        const dates = dernieresDonnees.map(donnee => donnee.date + ' ' + donnee.heure);
        const temperatures = dernieresDonnees.map(donnee => donnee.temperature);

        // Création du graphique
        const ctx = document.getElementById('temperature-chart').getContext('2d');
        const temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,  // Labels des dates/heures
                datasets: [{
                    label: 'Température (°C)',  // Légende de la série
                    data: temperatures,  // Données (températures)
                    borderColor: 'rgba(255, 99, 132, 1)',  // Couleur de la ligne
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Couleur de fond de la ligne
                    fill: true,  // Remplir sous la ligne
                    tension: 0.4  // Lissage de la ligne
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false  // Ne pas commencer à zéro sur l'axe Y
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", afficherGraphiqueTemp);
