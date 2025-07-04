
# Livano Agency – Refonte Web (Projet de stage)
Par Jean Fabrice ZARA: https://www.linkedin.com/in/jfzara-developpeur-react-node-montreal/


Dans le cadre de mon stage chez Livano, entreprise spécialisée en marketing d’affiliation et d’influence, j’ai été chargé de la refonte complète du site vitrine de l’agence. Ce stage, réalisé du 16 décembre 2024 au 21 février 2025, m’a permis de concevoir et de développer une application web moderne, performante, sécurisée et alignée avec les besoins de l’entreprise.

Technologies & Stack utilisées
Front-End
Astro : génération statique des pages pour un SEO optimal, structure modulaire

JavaScript : interactions dynamiques (formulaires, vidéos, événements DOM)

TypeScript : typage statique pour un code plus robuste et maintenable

Tailwind CSS : design responsive rapide à implémenter via classes utilitaires

Back-End & API
Astro API Routes : gestion des requêtes serveur, notamment pour le formulaire de contact

Resend API : envoi d’e-mails automatisés côté serveur

Sécurité
Cloudflare Turnstile : CAPTCHA invisible anti-spam

Honeypot : champ caché pour bloquer les soumissions automatisées

UX/UI
Thème adaptatif : détection automatique des préférences utilisateur (mode clair/sombre)

Lecteur vidéo custom : préchargement optimisé et transitions fluides

Navigation responsive : fluide sur mobile et bureau

Développement & Outils
Node.js + npm : environnement de développement, gestion des dépendances

Git + GitHub : versionnement, collaboration et déploiement

Python : automatisation de certaines tâches d’optimisation (ex. : traitement d’assets, scripts de build)

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
