GUIDE D'INSTALLATION ET DE DÉPLOIEMENT 

ÉTAPE 1 : INSTALLER NODE.JS

Allez sur Google.
Tapez "Télécharger Node.js".
Cliquez sur le premier lien (nodejs.org).
Cliquez sur le gros bouton vert "LTS" pour télécharger.
Double-cliquez sur le fichier téléchargé.
Cliquez "Suivant" plusieurs fois pour installer (laissez toutes les options par défaut).


ÉTAPE 2 : RÉCUPÉRER LE SITE

Créez un nouveau dossier sur votre bureau nommé "MonSite".
Ouvrez PowerShell :
Appuyez sur la touche Windows.
Tapez "PowerShell".
Cliquez sur "Windows PowerShell".

Copiez-collez ces commandes une par une :

cd Desktop\MonSite
git clone https://github.com/weshlokman/agencyWebsite.git
cd agencyWebsite


ÉTAPE 3 : INSTALLER LES DÉPENDANCES

Dans la même fenêtre PowerShell, tapez :

npm install
Attendez que ça se termine (ça peut prendre quelques minutes).


ÉTAPE 4 : DÉMARRER LE SITE

Toujours dans PowerShell, tapez :

npm run dev

Votre navigateur va s'ouvrir automatiquement avec le site.
Si ce n'est pas le cas, ouvrez votre navigateur et allez sur :
http://localhost:4321.


SI ÇA NE MARCHE PAS :

Assurez-vous d'avoir bien installé Node.js.
Fermez PowerShell et recommencez depuis l'ÉTAPE 2.
Si ça ne marche toujours pas, redémarrez votre ordinateur et recommencez.