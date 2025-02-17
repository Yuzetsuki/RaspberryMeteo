import board
import busio
import mysql.connector
from datetime import datetime
import time
import Adafruit_CharLCD
#from RPLCD.i2c import CharLCD

time.sleep(1)

# Initialise le capteur BME280
from adafruit_bme280 import basic as adafruit_bme280
i2c = busio.I2C(board.SCL, board.SDA)
bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c, address=0x76)

# Initialise l'écran LCD
lcd = Adafruit_CharLCD.Adafruit_CharLCDPlate(address=0x27)

# Connexion à la BDD
db = mysql.connector.connect(
	host="localhost",
	user="root",
	password="P@ssw0rd",
	database="MeteoDB"
)
cursor = db.cursor()

try:
	while True:
		# Lire et interpréter les donnéesdu capteur
		temperature = bme280.temperature
		humidity = bme280.humidity
		pressure = bme280.pressure
		maintenant = datetime.now()
		date = maintenant.date()
		heure = maintenant.time()

		# Affichage des données sur le terminal
		print(f"Température : {temperature: .2f} °C")
		print(f"Humidité de l'air : {humidity: .2f}%")
		print(f"Pression atmosphérique : {pressure: .2f} hPa")

		# Affichage des données sur l'écran LCD
#		lcd.message("Temp: {temperature: .2f}C")
#		lcd.message("Hum: {humidity: .2f}%")
#		lcd.message("Pres: {pressure: .2f}hPA")

		# Enregistrement des données dans la BDD
		sql = "INSERT INTO DonneesMeteo (temperature, humidity, pressure, date, heure) VALUES (%s, %s, %s, %s, %s)"
		valeurs = (temperature, humidity, pressure, date, heure)
		cursor.execute(sql, valeurs)
		db.commit()

		# Délai entre deux mesures en secondes
		time.sleep(600)

except KeyboardInterrupt:
	print("Arrêt du script.")
	db.close()
