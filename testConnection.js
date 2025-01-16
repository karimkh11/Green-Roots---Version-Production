import sequelize from './src/database/database.js'; // Assure-toi que le chemin est correct

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données PostgreSQL !');
  } catch (error) {
    console.error('Erreur de connexion :', error);
  } finally {
    await sequelize.close();
  }
})();
