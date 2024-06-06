import { Model, DataTypes } from 'sequelize'; // Importation des classes Model et DataTypes de Sequelize
import sequelize from '../database/database.js'; // Importation de l'instance de Sequelize depuis le fichier de configuration de la base de données

// Définition de la classe représentant le modèle d'un arbre dans la base de données
class Tree extends Model {}

// Initialisation des champs de la table "tree" avec leurs types de données et contraintes
Tree.init({
    campaign_id: { // ID de la campagne à laquelle l'arbre est associé
      type: DataTypes.INTEGER, // Type de données : Entier
      allowNull: false, // La valeur ne peut pas être nulle
      references: { // Définition d'une contrainte de clé étrangère
        model: 'Campaigns', // La table référencée dans la base de données
        key: 'id' // La clé primaire de la table référencée
      }
    },
    user_id: { // ID de l'utilisateur qui a planté l'arbre
      type: DataTypes.INTEGER, // Type de données : Entier
      allowNull: false, // La valeur ne peut pas être nulle
      references: { // Définition d'une contrainte de clé étrangère
        model: 'Users', // La table référencée dans la base de données
        key: 'id' // La clé primaire de la table référencée
      }
    },
    name: { // Nom de l'arbre
      type: DataTypes.TEXT, // Type de données : Texte
      allowNull: false // La valeur ne peut pas être nulle
    },
    description: { // Description de l'arbre
      type: DataTypes.TEXT, // Type de données : Texte
      allowNull: false // La valeur ne peut pas être nulle
    },
    image: { // URL de l'image de l'arbre
      type: DataTypes.TEXT, // Type de données : Texte
      allowNull: true // La valeur peut être nulle
    },
    price: { // Prix de l'arbre
      type: DataTypes.NUMERIC, // Type de données : Numérique
      allowNull: false // La valeur ne peut pas être nulle
    },
    date_of_purchase: { // Date d'achat de l'arbre
      type: DataTypes.DATEONLY, // Type de données : Date (sans heure)
      allowNull: false // La valeur ne peut pas être nulle
    },
    status: { // Statut de l'arbre
      type: DataTypes.TEXT, // Type de données : Texte
      allowNull: false // La valeur ne peut pas être nulle
    },
    planting_date: { // Date de plantation de l'arbre
      type: DataTypes.DATEONLY, // Type de données : Date (sans heure)
      allowNull: false // La valeur ne peut pas être nulle
    },
    gps_coordinates: { // Coordonnées GPS de l'emplacement de l'arbre
      type: DataTypes.GEOMETRY('POINT'), // Type de données : Géométrie (point)
      allowNull: true // La valeur peut être nulle
    },
    createdAt: { // Date de création de l'entrée dans la base de données
      type: DataTypes.DATE, // Type de données : Date et heure
      allowNull: false, // La valeur ne peut pas être nulle
      defaultValue: DataTypes.NOW // Valeur par défaut : la date et l'heure actuelles
    },
    updatedAt: { // Date de la dernière mise à jour de l'entrée dans la base de données
      type: DataTypes.DATE, // Type de données : Date et heure
      allowNull: true // La valeur peut être nulle
    }
  }, {
    sequelize, // Instance de Sequelize à utiliser pour ce modèle
    modelName: 'Tree', // Nom du modèle
    tableName: 'tree', // Nom de la table dans la base de données
    timestamps: true // Activation des timestamps pour enregistrer automatiquement les dates de création et de mise à jour
  });

export default Tree; // Exporte le modèle Tree pour pouvoir l'utiliser ailleurs dans l'application
