'use strict';
module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    location: DataTypes.STRING,
    batteries: DataTypes.INTEGER
  }, {});
  Station.associate = function(models) {
    // associations can be defined here
  };
  return Station;
};