'use strict';
module.exports = (sequelize, DataTypes) => {
  const Swapp = sequelize.define('Swapp', {
    oldBattery: DataTypes.JSONB,
    newBattery: DataTypes.JSONB,
    energyUsed: DataTypes.FLOAT,
    distance: DataTypes.FLOAT,
    stationId: DataTypes.INTEGER
  }, {});
  Swapp.associate = function(models) {
    // associations can be defined here
  };
  return Swapp;
};