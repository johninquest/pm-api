import { DataTypes } from "sequelize";
import sequelize from "../../shared/config/database.js";

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "commercial",
            "industrial",
            "land",
            "mixedUse",
            "multiFamily",
            "multiUnit",
            "singleFamily",
            "singleUnit",
          ],
        ],
      },
    },
    numberOfUnits: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    constructionYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentValue: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "properties",
    underscored: true,
  }
);

export default Property;