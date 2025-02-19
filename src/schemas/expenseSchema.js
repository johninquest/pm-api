// src/models/expense.model.js
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";
import sequelize from "../config/database.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateId = customAlphabet(alphabet, 21);

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.STRING(21),
      field: 'id',
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    propertyName: {
      type: DataTypes.STRING,
      field: 'property_name',
      allowNull: true,
    },
    dateOfExpense: {
      type: DataTypes.DATE,
      field: 'date_of_expense',
      allowNull: true,
    },
    expenseType: {
      type: DataTypes.STRING,
      field: 'expense_type',
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description',
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      field: 'amount',
      allowNull: true,
    },
    vendor: {
      type: DataTypes.STRING,
      field: 'vendor',
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: true,
    }
  },
  {
    tableName: "expenses",
    underscored: true,
  }
);

export default Expense;