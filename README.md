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
2. Installez les dépendances :
   ```bash
   npm install
   ```
   ou si vous utilisez yarn :
   ```bash
   yarn install
   ```
3. Configurez les variables d'environnement :
   - Créez un nouveau fichier a la racine du dossier Backend qui s'intitule .env .
   - Remplissez les valeurs nécessaires :
     - SERVER_PORT= définir un port
     - DB_HOST=host de votre sgbd
     - DB_PORT=par default 3306
     - DB_NAME=nom de votre base de donnée
     - DB_USER=nom d'utilisateur de vote sgbd
     - DB_PASS= mot de passe de votre sgbd
     - BCRYPT_SALT_ROUND= definir a 10
     - JWT_SECRET=clé complexe pour la sécurité 
     - JWT_DURING= 1 hour

### Configurer l'application Frontend (React.js avec Vite)

1. Allez dans le dossier frontend :

- Si vous êtes dans le dossier BackEnd :
    ```bash
    cd ..
    ```
- Puis pour aller dans le dossier Frontend :
   ```bash
   cd FrontEnd
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
   ou si vous utilisez yarn :
   ```bash
   yarn install
   ```
3. Configurez les variables d'environnement :
    - A la racine du dossier FrontEnd, créez un fichier .env
    - Dans le fichier .env ajouter la variable VITE_API_URL qui prendra en valeur le chemin de votre backend donc en local ce sera http://localhost:port/api/.

### Base de données

Pour ajouter la base de donnée au projet :

1. Dans le dossier Documentation, vous trouverez un fichier scriptbdd.sql.
2. Exécutez le script SQL sur votre système de gestion de base de données pour configurer la structure de la base de données.

## Démarrer l'application

### Backend

Dans le dossier backend, lancez le serveur avec :

```bash
npm run start
```

ou si vous utilisez yarn :

```bash
yarn start
```
Si cela a fonctionné vous devriez avoir un resultat similaire dans votre terminal :

![Exemple reussite backend](Documentation/images/Capture%20d'écran%202024-02-20%20001506.png)

### Frontend

Dans un nouveau terminal, allez dans le dossier frontend et lancez l'application avec :

```bash
npm run dev
```

ou si vous utilisez yarn :

```bash
yarn dev
```

Si cela a fonctionné vous devriez avoir un resultat similaire dans votre terminal :

![Exemple reussite frontend](Documentation/images/Capture%20d'écran%202024-02-20%20001444.png)

Votre application devrait maintenant être accessible à l'adresse indiquée dans la console (généralement [http://localhost:5173](http://localhost:5173) pour le frontend et [http://localhost:port](http://localhost:port) pour le backend, sauf configuration différente).

