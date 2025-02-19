// src/models/tenant.model.js
import { DataTypes } from "sequelize";
import { customAlphabet } from "nanoid";
import sequelize from "../config/database.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateId = customAlphabet(alphabet, 21);

const Tenant = sequelize.define(
  "Tenant",
  {
    id: {
      type: DataTypes.STRING(21),
      field: 'id',
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    nationalIdNumber: {
      type: DataTypes.STRING,
      field: 'national_id_number',
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: true,
    },
    address: {
      type: DataTypes.JSON,
      field: 'address',
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
    leaseStartDate: {
      type: DataTypes.DATE,
      field: 'lease_start_date',
      allowNull: true,
    },
    leaseEndDate: {
      type: DataTypes.DATE,
      field: 'lease_end_date',
      allowNull: true,
    },
    rentAmount: {
      type: DataTypes.DECIMAL,
      field: 'rent_amount',
      allowNull: true,
    },
    paymentFrequency: {
      type: DataTypes.INTEGER,
      field: 'payment_frequency',
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      field: 'payment_method',
      allowNull: true,
    }
  },
  {
    tableName: "tenants",
    underscored: true,
  }
);

export default Tenant;
