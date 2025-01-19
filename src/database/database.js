import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('PG_URL:', process.env.PG_URL); // Ajoutez ce log pour vérifier la valeur de PG_URL
// Initialiser Sequelize avec le dialecte explicite
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: console.log,
  dialectOptions: {
    connectTimeout: 10000,
  },
  define: {
    timestamps: false,
  },
});

sequelize.authenticate()
  .then(() => console.log('Connection successful'))
  .catch((err) => console.error('Unable to connect to the database:', err));
