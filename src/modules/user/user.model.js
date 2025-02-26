import { DataTypes } from "sequelize";
import sequelize from "../../shared/config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firebaseUid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]], // Add any other roles you need
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    underscored: true,
  }
);

export default User;