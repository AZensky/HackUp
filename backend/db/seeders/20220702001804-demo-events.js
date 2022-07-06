"use strict";

const { Op } = require("sequelize");

const events = [
  {
    groupId: 1,
    venueId: 1,
    name: "Tennis Group First Meet and Greet",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description: "The first meet and greet for our group! Come say hello!",
    startDate: "2021-11-19 20:00:00",
    endDate: "2021-11-19 21:00:00",
  },
  {
    groupId: 1,
    venueId: 1,
    name: "Yoga Group First Meet and Greet",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description: "The first meet and greet for our group! Come say hello!",
    startDate: "2021-11-19 20:00:00",
    endDate: "2021-11-19 21:00:00",
  },
  {
    groupId: 2,
    venueId: 2,
    name: "Basketball Group First Meet and Greet",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description: "The first meet and greet for our group! Come say hello!",
    startDate: "2021-11-19 20:00:00",
    endDate: "2021-11-19 21:00:00",
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

    await queryInterface.bulkInsert("Events", events);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Events", {
      name: {
        [Op.in]: [
          "Tennis Group First Meet and Greet",
          "Yoga Group First Meet and Greet",
          "Basketball Group First Meet and Greet",
        ],
      },
    });
  },
};
