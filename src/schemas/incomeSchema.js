// src/models/income.model.js
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";
import sequelize from "../config/database.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateId = customAlphabet(alphabet, 21);

const Income = sequelize.define(
  "Income",
  {
    id: {
      type: DataTypes.STRING(21),
      field: 'id',
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    source: {
      type: DataTypes.STRING,
      field: 'source',
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      field: 'amount',
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      field: 'payment_date',
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.STRING,
      field: 'property_id',
      allowNull: true,
    },
    unitId: {
      type: DataTypes.STRING,
      field: 'unit_id',
      allowNull: true,
    },
    tenantId: {
      type: DataTypes.STRING,
      field: 'tenant_id',
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: true,
    }
  },
  {
    tableName: "incomes",
    underscored: true,
  }
);

export default Income;