import { DataTypes } from "sequelize";
import sequelize from "../../shared/config/database.js";
import Property from "../property/property.model.js"; // Import the Property model

const Tenant = sequelize.define(
  "Tenant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      type: DataTypes.UUID,
      field: 'property_id',
      allowNull: true,
      references: {
        model: Property,
        key: 'id',
      },
    },
    unitId: {
      type: DataTypes.UUID,
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

// Define the association
Tenant.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

export default Tenant;