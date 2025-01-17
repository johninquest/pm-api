// src/models/user.model.js
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";
import sequelize from "../config/database.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateId = customAlphabet(alphabet, 21);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING(21),
      field: 'id',
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    firebaseUid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      validate: {
        isIn: [['admin', 'user']]  // Add any other roles you need
      }
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: "users",
    underscored: true,
  }
);

export default User;