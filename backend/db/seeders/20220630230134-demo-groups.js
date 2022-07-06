"use strict";

const { Op } = require("sequelize");
const groups = [
  {
    organizerId: 1,
    name: "Evening Tennis on the Water",
    about:
      "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
    type: "In person",
    private: true,
    city: "New York",
    state: "NY",
  },
  {
    organizerId: 1,
    name: "Morning Mimosas on the Lake",
    about:
      "Relax with rounds of drinks with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
    type: "In person",
    private: true,
    city: "New York",
    state: "NY",
  },
  {
    organizerId: 2,
    name: "Afternoon Music on the Lake",
    about:
      "Relax with jazz music and drinks with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
    type: "In person",
    private: true,
    city: "New York",
    state: "NY",
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

    await queryInterface.bulkInsert("Groups", groups);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Groups", {
      name: {
        [Op.in]: [
          "Evening Tennis on the Water",
          "Morning Mimosas on the Lake",
          "Afternoon Music on the Lake",
        ],
      },
    });
  },
};
