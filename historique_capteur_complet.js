async function afficherHistoriqueCompletCapteur() {
    try {
        const response = await fetch('historique_capteur_complet.php');
        const donnees = await response.json();

        const tableBody = document.querySelector("#historique-capteur-table tbody");
        tableBody.innerHTML = "";

        donnees.forEach(donnee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donnee.date}</td>
                <td>${donnee.heure}</td>
                <td>${Math.round(donnee.temperature)} °C</td>
                <td>${Math.round(donnee.humidity)} %</td>
                <td>${Math.round(donnee.pressure)} hPa</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Exécuter au chargement de la page
document.addEventListener("DOMContentLoaded", afficherHistoriqueCompletCapteur);
