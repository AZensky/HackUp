"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventAttendees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Events" },
      },
      status: {
        type: Sequelize.STRING,
        // allowNull: false,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventAttendees");
  },
};
