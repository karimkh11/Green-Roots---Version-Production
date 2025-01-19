import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('PG_URL:', process.env.PG_URL); // Ajoutez ce log pour vérifier la valeur de PG_URL
// Initialiser Sequelize avec le dialecte explicite
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres', // Spécifie explicitement le dialecte
  logging: false,      // Désactive les logs SQL (facultatif)
  dialectOptions: {
    useUTC: false, // Forcer l'utilisation d'IPv4
  },
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

export default sequelize;
