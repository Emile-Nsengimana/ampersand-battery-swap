'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    driverId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    gender: DataTypes.STRING,
    MotocycleId: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'please provide driver\'s motocycle id'
      }
    }
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
  };
  return Driver;
};