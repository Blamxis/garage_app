# Projet Garage Parrot

Découvrez PatGarage, votre solution tout-en-un pour l'achat de voitures d'occasion et les services de garage. Facilitez votre expérience automobile avec des fonctionnalités pratiques pour sélectionner votre prochaine voiture, planifier des services d'entretien et obtenir des conseils d'experts, le tout à portée de main. PatGarage : qualité, transparence, et satisfaction garanties.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé tous les éléments suivants sur votre système:
- [Node.js](https://nodejs.org/en/) (version x18)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Vous trouverez dans le dossier "Documentation" un fichier script pour la base de donnée.
- [Git](https://git-scm.com/)

## Installation

Afin d'installer le projet sur votre machine locale, veuillez suivre ces étapes.

### Cloner le dépôt

```bash
git clone git@github.com:Blamxis/garage_app.git
cd <garage_app>
```

### Configurer l'application Backend (Express.js)

1. Allez dans le dossier backend :
   ```bash
   cd BackEnd
   ```
2. Installez les dépendances:
   ```bash
   npm install
   ```
   ou si vous utilisez yarn:
   ```bash
   yarn install
   ```
3. Configurez les variables d'environnement:
   - Créez un nouveau fichier a la racine du dossier Backend qui s'intitule .env .
   - Remplissez les valeurs nécessaires (SERVER_PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, BCRYPT_SALT_ROUND, JWT_SECRET et JWT_DURING).

### Configurer l'application Frontend (React.js avec Vite)

1. Allez dans le dossier frontend:
Si vous êtes dans le dossier BackEnd:
    ```bash
    cd ..
    ```
Puis pour aller dans le dossier Frontend:
   ```bash
   cd FrontEnd
   ```
2. Installez les dépendances:
   ```bash
   npm install
   ```
   ou si vous utilisez yarn:
   ```bash
   yarn install
   ```
3. Configurez les variables d'environnement:
    - A la racine du dossier FrontEnd, créez un fichier .env
    - Dans le fichier .env ajouter la variable VITE_API_URL qui prendra en valeur le chemin de votre backend donc en local ce sera http://localhost:port/api/.

### Base de données

Pour ajouter la base de donnée au projet:

1. Dans le dossier Documentation, vous trouverez un fichier scriptbdd.sql.
2. Exécutez le script SQL sur votre système de gestion de base de données pour configurer la structure de la base de données.

## Démarrer l'application

### Backend

Dans le dossier backend, lancez le serveur avec:

```bash
npm run start
```

ou si vous utilisez yarn:

```bash
yarn start
```

### Frontend

Dans un nouveau terminal, allez dans le dossier frontend et lancez l'application avec:

```bash
npm run dev
```

ou si vous utilisez yarn:

```bash
yarn dev
```

Votre application devrait maintenant être accessible à l'adresse indiquée dans la console (généralement [http://localhost:port](http://localhost:port) pour le frontend et [http://localhost:port](http://localhost:port) pour le backend, sauf configuration différente).

