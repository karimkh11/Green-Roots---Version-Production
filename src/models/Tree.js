import { Model, DataTypes } from 'sequelize'; // Importation des classes Model et DataTypes de Sequelize
import sequelize from '../database/database.js'; // Importation de l'instance de Sequelize depuis le fichier de configuration de la base de données

// Définition de la classe représentant le modèle d'un arbre dans la base de données
class Tree extends Model {}

// Initialisation des champs de la table "tree" avec leurs types de données et contraintes
Tree.init({
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Campaigns',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // La valeur peut être nulle
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.NUMERIC,
    allowNull: false
  },
  date_of_purchase: {
    type: DataTypes.DATEONLY,
    allowNull: true // La valeur peut être nulle
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'En attente'  // Définit "Nouveau" comme valeur par défaut pour le statut
},
  planting_date: {
    type: DataTypes.DATEONLY,
    allowNull: true // La valeur peut être nulle
  },
  gps_coordinates: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Tree',
  tableName: 'tree',
  timestamps: true
});

export default Tree;
