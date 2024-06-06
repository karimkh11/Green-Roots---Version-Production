import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './User.js'; // Assuming that User model is defined in User.js file
import CommandLine from './Commandline.js'; // Assuming that CommandLine model is defined in CommandLine.js file

class Order extends Model {}

Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // The name of the table in the database
        key: 'id'
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true
  });



export default Order;
