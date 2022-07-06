"use strict";

const { GroupMember } = require("../models");
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

    await GroupMember.bulkCreate([
      {
        GroupId: 1,
        UserId: 1,
      },
      {
        GroupId: 1,
        UserId: 2,
        status: "co-host",
      },
      {
        GroupId: 1,
        UserId: 3,
        status: "member",
      },
      {
        GroupId: 2,
        UserId: 1,
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("GroupMembers", {
      GroupId: {
        [Op.in]: [1, 2],
      },
    });
  },
};
