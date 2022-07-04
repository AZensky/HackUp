"use strict";

const { GroupMember } = require("../models");

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
      groupId: {
        [Op.in]: [1, 2],
      },
    });
  },
};
