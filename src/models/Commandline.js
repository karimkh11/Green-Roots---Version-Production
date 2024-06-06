import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Order from './Order.js'; // Assuming that Order model is defined in Order.js file
import Tree from './Tree.js'; // Assuming that Tree model is defined in Tree.js file

class CommandLine extends Model {}

CommandLine.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders', // The name of the table in the database
        key: 'id'
      }
    },
    tree_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trees', // The name of the table in the database
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commandline_total: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'CommandLine',
    tableName: 'commandline',
    timestamps: true
  });


export default CommandLine;
