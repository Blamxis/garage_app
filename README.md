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
     - SERVER_PORT= 8888 # => Cette variable spécifie le port sur lequel le serveur de l'application doit écouter.
     - DB_HOST=# host de votre sgbd, par défaut : localhost
     - DB_PORT=# par default 3306
     - DB_NAME=# nom de votre base de donnée, ici ce sera garage_app comme indiqué dan sle script SQL.
     - DB_USER=# nom d'utilisateur de vote sgbd
     - DB_PASS=#  mot de passe de votre sgbd
     - BCRYPT_SALT_ROUND= 10 # => Cette variable est spécifique à la sécurité de l'application, en particulier pour le hachage des mots de passe (10 est un équilibre entre sécurité et performance).
     - JWT_SECRET=# => Une clé secrète utilisée pour signer et vérifier les JSON Web Tokens (JWT). Cette clé doit être complexe et unique pour garantir la sécurité des tokens. 
     - JWT_DURING=# => Cette variable définit la durée de validité d'un JWT. Ici, elle est réglée sur "1 hour", ce qui signifie que le token expirera une heure après sa création.

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
2. Utilisez un outil comme [XAMPP](https://www.apachefriends.org/fr/), [WAMP](https://www.wampserver.com/) ou [MAMP](https://www.mamp.info/en/downloads/) afin de gérer la base de données MySQL.
3. Ouvrez votre navigateur et accédez à [PhpMyAdmin](http://localhost/phpmyadmin/).
4. Connectez-vous avce vos identifiants de connexion pour accéder à PhpMyAdmin. (paramètre par defaut : nom utilisateur: root et champ de mot de passe vide).
5. Créer une nouvelle base de données, en utilisant le même nom que dans la variable DB_NAME, puis cliquez sur le bouton "Créer".
6. Importer le script SQL, pour ce faire, cliquer sur votre base de donnée dans la sidebar de gauche afin de la séléctionner puis rechercher l'onglet importer dans le panneau supérieur. Sur la page d'importation, vous devrez cliquer sur le bouton parcourir et choisir le fichier "scriptbdd.sql". Une fois selectionné, faites défiler vers le bas et cliquer su rle bouton "Exécuter" afin d'importer le script SQL dans la base de données.
7. Une fois que l'importation à été faites, vous pouvez vérifier que toutes les tables ont bien été créées. Pour ce faire, cliquez sur le nom de votre base de données dan sle panneau de gauche afin d'afficher les tables.
8. En suivant ces étapes vous aurez importé la structure nécessaire de votre base de données viale fichier "scriptbdd.sql" dans PhpMyAdmin, et l'application sera prête à utiliser cette base de données pour stocker et récupérer des données.

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

