import requests
import mysql.connector
from datetime import datetime
import time

api_key = "411210ed7ccf0ef45f4b53091c86f98b"
city = "Pau"
base_url = "https://api.openweathermap.org/data/2.5/weather?"

complete_url = f"{base_url}q={city}&appid={api_key}&units=metric"

response = requests.get(complete_url)

# Connexion à la BDD
db = mysql.connector.connect(
	host="localhost",
	user="root",
	password="P@ssw0rd",
	database="MeteoDB"
)
cursor = db.cursor()

if response.status_code == 200:
	data = response.json()

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

	print(f"Température actuelle à {city} : {temperature}°c")
	print(f"Ressentie : {temp_feels_like}°c")
	print(f"Conditions météo : {weather_main}")
	print(f"Humidité : {humidity}%")
	print(f"Pression : {pressure}hPa")

	sql = "INSERT INTO DonneesAPI (temperature, temp_feels_like, weather_main, humidity, pressure, date, heure) VALUES (%s, %s, %s, %s, %s, %s, %s)"
	valeurs = (temperature, temp_feels_like, weather_main, humidity, pressure, date, heure)
	cursor.execute(sql, valeurs)
	db.commit()

else:
	print("Erreur dans la récupération des données.")
