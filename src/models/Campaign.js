import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './User.js';


class Campaign extends Model {}

Campaign.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true // L'image peut être nulle si aucune image n'est téléchargée
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: User,
        key: 'id',
      },
      allowNull: true,
      onDelete: 'SET NULL'
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
    modelName: 'Campaign',
    tableName: 'campaign',
    timestamps: true
  });



export default Campaign;
