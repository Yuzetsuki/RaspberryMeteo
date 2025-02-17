async function mettreAJourCapteur() {
    try {
        const response = await fetch('get_capteur_data.php'); // Appel du script PHP
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

	const temperature = Math.round(data.temperature);
	const humidity = Math.round(data.humidity);
	const pressure = Math.round(data.pressure);
        // Injection des données dans la page
        document.querySelector('.temperature-capteur').innerHTML = `${temperature} °C`;
        document.querySelector('.humidite-capteur').innerHTML = `${humidity} %`;
        document.querySelector('.pression-capteur').innerHTML = `${pressure} hPa`;

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(document.querySelector(".temperature-capteur")); 
});


// Met à jour toutes les 10 secondes
setInterval(mettreAJourCapteur, 600);
mettreAJourCapteur(); // Exécution au chargement

function mettreAJourDate() {
    // Obtenir la date et l'heure actuelles
    const maintenant = new Date();
    // Formater la date
    const optionsDate = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dateFormattee = maintenant.toLocaleDateString('fr-FR', optionsDate);
    // Formater l'heure
    const optionsHeure = { hour: '2-digit', minute: '2-digit' };
    const heureFormattee = maintenant.toLocaleTimeString('fr-FR', optionsHeure);

    // Afficher la date et l'heure sur la page
    const dateHeureElement = document.getElementById('date-heure');
    if (dateHeureElement) {
        dateHeureElement.textContent = `${dateFormattee} - ${heureFormattee}`;
    }
}

// Met à jour la date/heure toutes les minutes
setInterval(mettreAJourDate, 600);
// Exécuter immédiatement au chargement de la page
document.addEventListener("DOMContentLoaded", mettreAJourDate);

async function afficherHistorique() {
    try {
        const response = await fetch('get_historique_capteur.php'); // Appel du script PHP
        const donnees = await response.json(); // On récupère les données au format JSON

	// On sélectionne le body du tableau où les données seront injectées
        const tableauBody = document.querySelector('table tbody');
        tableauBody.innerHTML = ''; // On vide le tableau avant d'y ajouter de nouvelles données

        // Pour chaque ligne de données, on crée une nouvelle ligne dans le tableau
        donnees.forEach((donnee) => {
            const tr = document.createElement('tr'); // Créer une nouvelle ligne de tableau

            // Créer les cellules pour chaque donnée
            const tdDate = document.createElement('td');
            tdDate.textContent = donnee.date; // Date formatée depuis la DB

            const tdHeure = document.createElement('td');
            tdHeure.textContent = donnee.heure; // Heure formatée depuis la DB

            const tdTemp = document.createElement('td');
            tdTemp.textContent = `${Math.round(donnee.temperature)} °C`; // Température arrondie

            const tdHum = document.createElement('td');
            tdHum.textContent = `${Math.round(donnee.humidity)} %`; // Humidité arrondie

            const tdPress = document.createElement('td');
            tdPress.textContent = `${Math.round(donnee.pressure)} hPa`; // Pression arrondie

            // Ajouter les cellules à la ligne
            tr.appendChild(tdDate);
            tr.appendChild(tdHeure);
            tr.appendChild(tdTemp);
            tr.appendChild(tdHum);
            tr.appendChild(tdPress);

            // Ajouter la ligne au body du tableau
            tableauBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Appel de la fonction pour afficher les données dès le chargement de la page
document.addEventListener("DOMContentLoaded", afficherHistorique);

async function afficherDonneesAPI() {
    try {
        const response = await fetch('get_donnees_api.php'); 
        const donnees = await response.json();

	console.log("Données récupérées : ", donnees); //debog

        if (donnees.length > 0) {
            // Sélection des éléments HTML où les données seront injectées
            const temperatureElement = document.getElementById('temperature-api');
            const humidityElement = document.getElementById('humidity-api');
            const pressureElement = document.getElementById('pressure-api');
            const tempFeelsLikeElement = document.getElementById('temp-feels-like');
	    const weatherIconElement = document.getElementById('weather-icon');

	    if (!weatherIconElement) {
		console.error("L'élément weather-icon est introuvable dans le DOM");
		return;
	    }

            // Remplir les éléments avec les données
            const donnee = donnees[0]; 
           
	    temperatureElement.textContent = `${Math.round(donnee.temperature)} °C`;
            humidityElement.textContent = `${Math.round(donnee.humidity)} %`; 
            pressureElement.textContent = `${Math.round(donnee.pressure)} hPa`; 
            tempFeelsLikeElement.textContent = `${Math.round(donnee.temp_feels_like)} °C`; 

	    const weatherIcons = {
                "clear": "fa-solid fa-sun",
                "clouds": "fa-solid fa-cloud-sun",
                "rain": "fa-solid fa-cloud-rain",
                "drizzle": "fa-solid fa-cloud-showers-heavy",
                "thunderstorm": "fa-solid fa-cloud-bolt",
                "snow": "fa-regular fa-snowflake",
                "mist": "fa-solid fa-smog",
                "fog": "fa-solid fa-smog",
                "haze": "fa-solid fa-smog",
                "smoke": "fa-solid fa-smog",
                "dust": "fa-solid fa-smog",
                "sand": "fa-solid fa-smog",
                "ash": "fa-solid fa-smog",
                "squall": "fa-solid fa-wind",
                "tornado": "fa-solid fa-wind"
            };

            // Récupération de la condition météo et mise à jour de l'icône
            const weatherCondition = donnee.weather_main.toLowerCase();
            const newIconClass = weatherIcons[weatherCondition] || "fa-solid fa-question"; // Icône par défaut si inconnu

	    console.log("Condition météo détectée :", weatherCondition); //debog

            // Remplacer la classe actuelle par la nouvelle
            weatherIconElement.className = newIconClass;

        } else {
            console.log("Aucune donnée disponible.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données API :", error);
    }
}

// Met à jour toutes les 10 secondes
setInterval(afficherDonneesAPI, 600);
afficherDonneesAPI(); // Exécution au chargement

async function afficherHistoriqueAPI() {
    try {
        const response = await fetch('get_historique_api.php'); // Appel du PHP
        const donnees = await response.json(); // Conversion en JSON

        const tableBody = document.querySelector("#historique-api-table tbody");
        tableBody.innerHTML = ""; // Vider le tableau avant de remplir

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
        console.error("Erreur lors de la récupération de l'historique API :", error);
    }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", afficherHistoriqueAPI);
