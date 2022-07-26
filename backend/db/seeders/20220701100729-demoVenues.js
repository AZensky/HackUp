"use strict";

const { Op } = require("sequelize");

const demoVenues = [
  {
    groupId: 1,
    address: "No Venue",
    city: "",
    state: "",
    lat: 37.7645358,
    lng: -122.4730327,
  },
  {
    groupId: 1,
    address: "123 Disney Lane",
    city: "Los Angeles",
    state: "CA",
    lat: 67.7645358,
    lng: -112.4730327,
  },
  {
    groupId: 1,
    address: "321 Universal Lane",
    city: "Los Angeles",
    state: "CA",
    lat: 67.7645358,
    lng: -112.4730327,
  },
  {
    groupId: 2,
    address: "321 San Francisco Lane",
    city: "San Francisco",
    state: "CA",
    lat: 47.7645358,
    lng: -102.4730327,
  },
  {
    groupId: 1,
    address: "123 New York Lane",
    city: "New York",
    state: "NY",
    lat: 47.7645358,
    lng: -102.4730327,
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
    await queryInterface.bulkInsert("Venues", demoVenues);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Venues", {
      address: {
        [Op.in]: [
          "123 Disney Lane",
          "321 Universal Lane",
          "123 San Francisco Lane",
          "123 New York Lane",
          "No Venue",
        ],
      },
    });
  },
};
