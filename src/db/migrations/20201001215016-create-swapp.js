'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Swapps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      oldBattery: {
        type: Sequelize.JSONB
      },
      newBattery: {
        type: Sequelize.JSONB
      },
      energyUsed: {
        type: Sequelize.FLOAT
      },
      distance: {
        type: Sequelize.FLOAT
      },
      StationId: {
        type: Sequelize.INTEGER
      },
      DriverId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Swapps');
  }
};