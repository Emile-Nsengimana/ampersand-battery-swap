'use strict';
module.exports = (sequelize, DataTypes) => {
  const Swapp = sequelize.define('Swapp', {
    oldBattery: DataTypes.JSONB,
    newBattery: DataTypes.JSONB,
    energyUsed: DataTypes.FLOAT,
    distance: DataTypes.FLOAT,
    StationId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        message: 'please provide station id'
      }
    },
    DriverId: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'please provide driver\'s id'
      }
    }
  }, {});
  Swapp.associate = function(models) {
    // associations can be defined here
  };
  return Swapp;
};