// src/models/property.model.js
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";
import sequelize from "../config/database.js";

// Define the custom alphabet and nanoid generator
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateId = customAlphabet(alphabet, 21);

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.STRING(21),
      field: "id", // Explicitly map id
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    name: {
      type: DataTypes.STRING,
      field: "name", // Explicitly map name
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      field: "type", // Explicitly map type
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
      field: "number_of_units", // Different column name
      defaultValue: 1,
      allowNull: false,
    },
    constructionYear: {
      type: DataTypes.STRING,
      field: "construction_year", // Different column name
      allowNull: true,
    },
    currentValue: {
      type: DataTypes.DECIMAL,
      field: "current_value", // Different column name
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      field: "city", // Explicitly map city
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      field: "country", // Explicitly map country
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      field: "street", // Explicitly map street
      allowNull: true,
    },
    postcode: {
      type: DataTypes.STRING,
      field: "postcode", // Explicitly map postcode
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      field: "state", // Explicitly map state
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by", // Different column name
      allowNull: false,
    },
  },
  {
    tableName: "properties",
    underscored: true
  }
);

export default Property;
