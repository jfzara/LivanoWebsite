
# Livano Agency – Refonte Web (Projet de stage)

Dans le cadre de mon stage chez Livano, entreprise spécialisée en marketing d’affiliation et d’influence, j’ai été chargé de la refonte complète du site vitrine de l’agence. Ce stage, réalisé du 16 décembre 2024 au 21 février 2025, m’a permis de concevoir et de développer une application web moderne, performante, sécurisée et alignée avec les besoins de l’entreprise.

Technologies & Stack utilisées
Front-End

Astro : rendu statique, excellent pour le SEO, intégration d’îlots React

React : composants dynamiques (formulaire, vidéos, interactions)

Tailwind CSS : design responsive, utilitaire, rapide à mettre en œuvre

Back-End & API

Astro API Routes : gestion des requêtes POST pour formulaire de contact

Resend API : envoi d’e-mails automatisés

Sécurité

Cloudflare Turnstile : captcha invisible, anti-spam

Honeypot : champ caché pour bloquer les bots

UX/UI

Thème adaptatif : détection des préférences (clair/sombre)

Composant VideoPlayer : préchargement + transitions fluides

Navigation responsive : compatible mobile / desktop

Développement & Outils

Node.js + npm : environnement de développement, gestion des scripts

Git + GitHub : versionnement et hébergement du code source

Architecture du projet
vbnet
Copier
Modifier
src/
├── components/       → composants Astro & React
├── layouts/          → templates de page
├── pages/            → routes du site
├── api/              → logique serveur (formulaire)
├── scripts/          → JS/TS pour l'interactivité
public/               → fichiers statiques
.env                  → variables d’environnement
astro.config.mjs      → configuration Astro
tailwind.config.mjs   → configuration Tailwind
package.json          → dépendances + scripts
Installation locale
