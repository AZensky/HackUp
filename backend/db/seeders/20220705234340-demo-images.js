"use strict";
const { Op } = require("sequelize");

const demoImages = [
  {
    url: "www.image1.com",
    userId: 1,
    eventId: 1,
  },
  {
    url: "www.image2.com",
    userId: 1,
    eventId: 2,
  },
  {
    url: "www.image3.com",
    userId: 2,
    groupId: 1,
  },
  {
    url: "www.image4.com",
    userId: 2,
    groupId: 2,
  },
];

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
    await queryInterface.bulkInsert("Images", demoImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", {
      eventId: { [Op.in]: [1, 2] },
      groupId: { [Op.in]: [1, 2] },
    });
  },
};
