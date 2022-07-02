"use strict";

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

    await queryInterface.bulkInsert("EventAttendees", [
      {
        userId: 1,
        eventId: 1,
        // status: "pending",
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
