# Utiliser une image Node.js officielle
FROM node:18

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port utilisé par l'application
EXPOSE 3004

# Lancer l'application
CMD ["npm", "start"]
