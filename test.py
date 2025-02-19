from RPLCD.i2c import CharLCD
import time

# Initialisation de l'écran LCD
lcd = CharLCD(i2c_expander='PCF8574', address=0x27)

# Effacer l'écran
lcd.clear()

# Fonction pour afficher sur l'écran en respectant la limite de 16 caractères par ligne
def afficher_lcd(lcd, texte):
    # Si le texte dépasse 16 caractères, le diviser en plusieurs lignes
    ligne1 = texte[:16]  # Prendre les 16 premiers caractères pour la première ligne
    ligne2 = texte[16:32]  # Prendre les caractères suivants pour la deuxième ligne (s'il y en a)

    # Affichage de la première ligne
    lcd.write_string(ligne1)  
    lcd.cursor_pos = (1, 0)   # Placer le curseur sur la deuxième ligne
    # Affichage de la deuxième ligne
    lcd.write_string(ligne2)

# Afficher "Hello World" sur la première ligne
afficher_lcd(lcd, "Hello World")

time.sleep(2)

# Afficher "Hellooooo" sur la première ligne
afficher_lcd(lcd, "Hellooooo")

time.sleep(2)

# Effacer l'écran
lcd.clear()

# Afficher "Test" sur la première ligne
afficher_lcd(lcd, "Test")
