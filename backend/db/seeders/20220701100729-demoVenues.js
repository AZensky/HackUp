"use strict";

const demoVenues = [
  {
    groupId: 1,
    address: "123 Disney Lane",
    city: "New York",
    state: "NY",
    lat: 37.7645358,
    lng: -122.4730327,
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
    // await queryInterface.bulkDelete("Venues", {
    //   address: "123 Disney Lane",
    // });
  },
};
