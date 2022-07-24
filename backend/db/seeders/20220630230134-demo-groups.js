"use strict";

const { Op } = require("sequelize");
const groups = [
  {
    organizerId: 1,
    name: "HackDevs",
    about:
      "Tech savvy college students enthusiastic about developing projects.",
    type: "In person",
    private: true,
    city: "New York",
    state: "NY",
    previewImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    organizerId: 1,
    name: "HackCrew",
    about:
      "Experienced developers looking to collaborate and learn cutting-edge technologies.",
    type: "In person",
    private: true,
    city: "San Jose",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1581091870598-36ce9bad5c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fGNvZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    organizerId: 2,
    name: "Aspiring Software Engineers",
    about:
      "Self-taught developers looking to break into the medical field. We welcome all levels of expertise, whether you're a complete beginner, or an established software engineer! Join us to support a growing community of aspiring software developers!",
    type: "In person",
    private: true,
    city: "Seattle",
    state: "WA",
    previewImage:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    organizerId: 2,
    name: "Anime-Lovers",
    about:
      "We are a group of individuals employed in the tech industry. We appreciate anime, and the Japanese culture.",
    type: "In person",
    private: true,
    city: "Los Angeles",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    organizerId: 1,
    name: "UCDHackers",
    about:
      "UC Davis students enthusiastic about programming and technology. We collaborate on projects and compete in hackathons. UC Davis students only!",
    type: "In person",
    private: true,
    city: "San Jose",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
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
          "HackDevs",
          "HackCrew",
          "Aspiring Software Engineers",
          "Anime-Lovers",
          "UCDHackers",
        ],
      },
    });
  },
};
