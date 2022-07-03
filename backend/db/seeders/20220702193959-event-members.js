"use strict";

const { EventAttendee } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await EventAttendee.bulkCreate([
      {
        userId: 1,
        eventId: 1,
      },
      {
        userId: 2,
        eventId: 1,
        status: "member",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("EventAttendees", {
      eventId: 1,
    });
  },
};
