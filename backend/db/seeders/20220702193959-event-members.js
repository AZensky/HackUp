"use strict";

const { EventAttendee } = require("../models");
const { Op } = require("sequelize");

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
        UserId: 1,
        EventId: 1,
        status: "member",
      },
      {
        UserId: 2,
        EventId: 1,
        status: "co-host",
      },
      {
        UserId: 3,
        EventId: 1,
        status: "pending",
      },
      {
        UserId: 2,
        EventId: 2,
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
      EventId: { [Op.in]: [1, 2] },
    });
  },
};
