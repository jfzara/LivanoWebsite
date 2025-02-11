from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementClickInterceptedException
from selenium.webdriver.common.action_chains import ActionChains
import time

def test_form():
    # Configuration du WebDriver avec des options supplémentaires
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')
    options.add_argument('--disable-infobars')
    options.add_argument('--disable-extensions')
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 20)
    actions = ActionChains(driver)

    try:
        print("Ouverture de la page...")
        driver.get("http://localhost:4321")
        time.sleep(3)

        print("Remplissage du formulaire...")
        form_fields = {
            "name": "Lokman Sahnoun",
            "email": "lokman.68@hotmail.com",
            "company": "Livano Agency",
            "phone": "+1234567890",
            "message": "This is a test message to check bot detection."
        }

        # Remplir chaque champ
        for field_name, value in form_fields.items():
            try:
                field = wait.until(
                    EC.presence_of_element_located((By.NAME, field_name))
                )
                field.clear()
                field.send_keys(value)
                print(f"Champ {field_name} rempli avec succès")
            except TimeoutException:
                print(f"❌ Erreur: Impossible de trouver le champ {field_name}")
                raise

        # Injecter un faux token reCAPTCHA
        print("\nInjection du token reCAPTCHA de test...")
        driver.execute_script("""
            document.getElementById('g-recaptcha-response').value = 'test_token';
        """)

        # Trouver le bouton de soumission
        print("\nRecherche du bouton de soumission...")
        button_locators = [
            (By.CSS_SELECTOR, "button[type='submit']"),
            (By.CSS_SELECTOR, "#contactForm button[type='submit']"),
            (By.XPATH, "//button[contains(text(), 'Submit')]"),
            (By.XPATH, "//form[@id='contactForm']//button[@type='submit']")
        ]

        submit_button = None
        for locator in button_locators:
            try:
                print(f"Essai du sélecteur: {locator[1]}")
                submit_button = wait.until(
                    EC.element_to_be_clickable(locator)
                )
                print(f"✅ Bouton trouvé avec le sélecteur: {locator[1]}")
                break
            except Exception as e:
                print(f"❌ Échec avec le sélecteur {locator[1]}: {str(e)}")
                continue

        if not submit_button:
            raise Exception("Bouton de soumission introuvable")

        # S'assurer que la page est complètement chargée
        print("\nAttente du chargement complet de la page...")
        time.sleep(2)
        
        # Défiler jusqu'au bouton
        print("Défilement jusqu'au bouton...")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", submit_button)
        time.sleep(1)

        # Essayer de cliquer sur le bouton avec différentes méthodes
        print("\nTentatives de clic sur le bouton...")
        success = False
        click_methods = [
            ("JavaScript Click", lambda: driver.execute_script("arguments[0].click();", submit_button)),
            ("Selenium Click", lambda: submit_button.click()),
            ("Action Chains", lambda: actions.move_to_element(submit_button).click().perform()),
            ("Enter Key", lambda: submit_button.send_keys('\n')),
        ]

        for method_name, click_method in click_methods:
            try:
                print(f"\nEssai méthode: {method_name}")
                click_method()
                success = True
                print(f"✅ Clic réussi avec {method_name}!")
                break
            except Exception as e:
                print(f"❌ Échec de {method_name}: {str(e)}")
                driver.save_screenshot(f"click_failure_{method_name.lower().replace(' ', '_')}.png")

        if not success:
            raise Exception("Impossible de cliquer sur le bouton après plusieurs tentatives")

        # Attendre et vérifier la réponse
        print("\nAttente de la réponse...")
        time.sleep(3)
        
        # Vérifier les messages de succès ou d'erreur
        try:
            message_succes = wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, "success-container"))
            )
            print(f"\n✅ Message de succès trouvé : {message_succes.text}")
        except TimeoutException:
            try:
                message_erreur = wait.until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "[role='alert'] .text-red-600"))
                )
                print(f"\n❌ Message d'erreur trouvé : {message_erreur.text}")
            except TimeoutException:
                print("\n❓ Aucun message de réponse trouvé")

    except Exception as e:
        print(f"\n❌ Erreur lors du test : {str(e)}")
        try:
            driver.save_screenshot("error_screenshot.png")
            print("Une capture d'écran a été sauvegardée dans 'error_screenshot.png'")
        except:
            print("Impossible de sauvegarder la capture d'écran")

    finally:
        print("\nFermeture du navigateur...")
        driver.quit()

if __name__ == "__main__":
    print("Démarrage du test de détection de bot...")
    test_form()
