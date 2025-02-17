async function afficherHistoriqueCompletAPI() {
    try {
        const response = await fetch('historique_api_complet.php');
        const donnees = await response.json();

        const tableBody = document.querySelector("#historique-api-table tbody");
        tableBody.innerHTML = "";

	 const traductionWeather = {
                "Clear": "Ciel dégagé",
                "Clouds": "Nuages",
                "Rain": "Pluie",
                "Snow": "Neige",
                "Drizzle": "Bruine",
                "Thunderstorm": "Orages",
                "Mist": "Brume",
                "Fog": "Brume",
                "Haze": "Brume",
                "Smoke": "Fumée",
                "Dust": "Poussière",
                "Sand": "Sables",
                "Ash": "Cendres",
                "Squall": "Bourrasques",
                "Tornado": "Tornade"
        };
	
        donnees.forEach(donnee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donnee.date}</td>
                <td>${donnee.heure}</td>
                <td>${Math.round(donnee.temperature)} °C</td>
                <td>${Math.round(donnee.humidity)} %</td>
                <td>${Math.round(donnee.pressure)} hPa</td>
		<td>${traductionWeather[donnee.weather_main] || donnee.weather_main}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", afficherHistoriqueCompletAPI);
