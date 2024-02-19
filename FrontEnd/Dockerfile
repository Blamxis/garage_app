# Étape de construction
FROM node:18.19.1-alpine3.18 AS build

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie les fichiers et dossiers du projet dans le répertoire de travail du conteneur
COPY . .

# Construit l'application pour la production
RUN npm run build

# Étape de déploiement
FROM nginx:alpine

# Copie les fichiers de construction de l'étape précédente dans le répertoire de service de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Optionnel: Si vous avez une configuration spécifique pour nginx, copiez-la ici
# Expose le port 80 pour accéder à votre application
EXPOSE 80

# Lance Nginx et s'assure que le processus ne s'arrête pas
CMD ["nginx", "-g", "daemon off;"]