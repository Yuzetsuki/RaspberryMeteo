import requests
import mysql.connector
from datetime import datetime

# Clé API et ville cible
API_KEY = "411210ed7ccf0ef45f4b53091c86f98b"
CITY = "Pau"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

# Initialisation des fonctions
def get_weather_data():
    """Récupère les données météo de l'API OpenWeatherMap et retourne un dictionnaire."""
    complete_url = f"{BASE_URL}q={CITY}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(complete_url)
        response.raise_for_status()  # Lève une exception en cas d'erreur HTTP
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la récupération des données météo : {e}")
        return None

def connect_db():
    """Établit la connexion à la base de données et retourne la connexion et le curseur."""
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="P@ssw0rd",
            database="MeteoDB"
        )
        cursor = db.cursor()
        return db, cursor
    except mysql.connector.Error as e:
        print(f"Erreur de connexion à la base de données : {e}")
        return None, None

def save_weather_data(db, cursor, data):
    """Enregistre les données météo dans la base de données."""
    try:
        main = data['main']
        weather = data['weather'][0]
        temperature = main['temp']
        temp_feels_like = main['feels_like']
        weather_main = weather['main']
        humidity = main['humidity']
        pressure = main['pressure']
        maintenant = datetime.now()
        date = maintenant.date()
        heure = maintenant.time()

        print(f"Température actuelle à {CITY} : {temperature}°C")
        print(f"Ressentie : {temp_feels_like}°C")
        print(f"Conditions météo : {weather_main}")
        print(f"Humidité : {humidity}%")
        print(f"Pression : {pressure} hPa")

        sql = """
        INSERT INTO DonneesAPI (temperature, temp_feels_like, weather_main, humidity, pressure, date, heure)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        valeurs = (temperature, temp_feels_like, weather_main, humidity, pressure, date, heure)
        
        cursor.execute(sql, valeurs)
        db.commit()
        print("Données enregistrées avec succès !")
    except Exception as e:
        print(f"Erreur lors de l'enregistrement des données : {e}")

# Script principal
def main():
    """Script principal."""
    data = get_weather_data()
    
    if data:
        db, cursor = connect_db()
        if db and cursor:
            save_weather_data(db, cursor, data)
            cursor.close()
            db.close()
        else:
            print("Impossible d'établir la connexion à la base de données.")

# Lancement du script
if __name__ == "__main__":
    main()
