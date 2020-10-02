'use strict';
module.exports = (sequelize, DataTypes) => {
  const Motocycle = sequelize.define('Motocycle', {
    serialNo: DataTypes.STRING,
    registrationPlate: DataTypes.STRING
  }, {});
  Motocycle.associate = function(models) {
    // associations can be defined here
  };
  return Motocycle;
};