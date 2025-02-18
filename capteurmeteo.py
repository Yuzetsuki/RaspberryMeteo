import board
import busio
import mysql.connector
from datetime import datetime
import time
import Adafruit_CharLCD
from adafruit_bme280 import basic as adafruit_bme280

# Temps d'attente initial pour éviter les erreurs au démarrage
time.sleep(1)

# Initialisation des fonctions
def init_capteur():
    """Initialise le capteur BME280 et retourne l'objet capteur."""
    try:
        i2c = busio.I2C(board.SCL, board.SDA)
        return adafruit_bme280.Adafruit_BME280_I2C(i2c, address=0x76)
    except Exception as e:
        print(f"Erreur lors de l'initialisation du capteur : {e}")
        return None

def init_lcd():
    """Initialise l'écran LCD et retourne l'objet LCD."""
    try:
        return Adafruit_CharLCD.Adafruit_CharLCDPlate(address=0x27)
    except Exception as e:
        print(f"Erreur lors de l'initialisation de l'écran LCD : {e}")
        return None

def connect_db():
    """Établit la connexion à la base de données MySQL et retourne l'objet connexion et curseur."""
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="P@ssw0rd",
            database="MeteoDB"
        )
        cursor = db.cursor()
        return db, cursor
    except mysql.connector.Error as err:
        print(f"Erreur lors de la connexion à la base de données : {err}")
        return None, None

def lire_donnees_capteur(capteur):
    """Lit les données du capteur BME280 et retourne un dictionnaire contenant température, humidité, pression, date et heure."""
    if capteur:
        maintenant = datetime.now()
        return {
            "temperature": round(capteur.temperature, 2),
            "humidity": round(capteur.humidity, 2),
            "pressure": round(capteur.pressure, 2),
            "date": maintenant.date(),
            "heure": maintenant.time()
        }
    return None

def afficher_lcd(lcd, donnees):
    """Affiche les données météo sur l'écran LCD."""
    if lcd and donnees:
        lcd.clear()
        lcd.message(f"Temp: {donnees['temperature']}C\n")
        lcd.message(f"Hum: {donnees['humidity']}%  Pres: {donnees['pressure']}hPa")

def enregistrer_donnees_bdd(cursor, db, donnees):
    """Enregistre les données météo dans la base de données."""
    if cursor and db and donnees:
        try:
            sql = "INSERT INTO DonneesMeteo (temperature, humidity, pressure, date, heure) VALUES (%s, %s, %s, %s, %s)"
            valeurs = (donnees["temperature"], donnees["humidity"], donnees["pressure"], donnees["date"], donnees["heure"])
            cursor.execute(sql, valeurs)
            db.commit()
            print("Données enregistrées avec succès.")
        except mysql.connector.Error as err:
            print(f"Erreur lors de l'enregistrement des données : {err}")

# Script principal
def main():
    """Script principal."""
    capteur = init_capteur()
    lcd = init_lcd()
    db, cursor = connect_db()

    if not capteur or not db:
        print("Impossible de démarrer le script (capteur ou base de données non disponible).")
        return

    try:
        while True:
            donnees = lire_donnees_capteur(capteur)
            if donnees:
                print(f"Température : {donnees['temperature']} °C")
                print(f"Humidité : {donnees['humidity']} %")
                print(f"Pression : {donnees['pressure']} hPa")

                afficher_lcd(lcd, donnees)
                enregistrer_donnees_bdd(cursor, db, donnees)

            time.sleep(600)  # Pause de 10 minutes

    except KeyboardInterrupt:
        print("\nArrêt du script.")
    finally:
        if db:
            db.close()
            print("Connexion à la base de données fermée.")

# Lancer le script principal
if __name__ == "__main__":
    main()
