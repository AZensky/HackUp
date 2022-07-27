"use strict";

const { Op } = require("sequelize");

const events = [
  {
    groupId: 1,
    venueId: 2,
    name: "The Annual Great Hackathon",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description:
      "HackDevs annual hackathon! Get your friends and come compete for a chance to win prizes!",
    startDate: new Date("2023-03-19 20:00:00"),
    endDate: new Date("2023-03-19 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHlpbmclMjB0b2dldGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    groupId: 1,
    venueId: 3,
    name: "Web Development Hackathon",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description:
      "A web application focused hackathon hosted by HackDevs. Come test your web development skills!",
    startDate: new Date("2023-04-02 20:00:00"),
    endDate: new Date("2023-04-02 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHlpbmclMjB0b2dldGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    groupId: 2,
    venueId: 4,
    name: "HackCrew Pizza Night",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description:
      "The first meet and greet for our group! Come say hello, there will be pizza!",
    startDate: new Date("2023-04-21 20:00:00"),
    endDate: new Date("2023-04-21 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1600359773269-0e5197c3829b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBpenphJTIwbmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    groupId: 2,
    venueId: 4,
    name: "National FinTech Hackathon",
    type: "Online",
    capacity: 10,
    price: 18.5,
    description:
      "A hackathon exclusively for developers interested in developing applications in FinTech!",
    startDate: new Date("2023-06-10 20:00:00"),
    endDate: new Date("2023-06-10 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmludGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
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
          "The Annual Great Hackathon",
          "Web Development Hackathon",
          "HackCrew Pizza Night",
          "National FinTech Hackathon",
        ],
      },
    });
  },
};
