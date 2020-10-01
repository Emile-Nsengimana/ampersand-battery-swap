'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    driverId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
  };
  return Driver;
};