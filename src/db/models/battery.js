'use strict';
module.exports = (sequelize, DataTypes) => {
  const Battery = sequelize.define('Battery', {
    serialNo: DataTypes.STRING,
    energyLevel: DataTypes.FLOAT
  }, {});
  Battery.associate = function(models) {
    // associations can be defined here
  };
  return Battery;
};