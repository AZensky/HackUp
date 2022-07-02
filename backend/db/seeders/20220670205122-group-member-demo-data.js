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
        groupId: 1,
        userId: 1,
      },
      {
        groupId: 1,
        userId: 2,
        status: "member",
      },
      {
        groupId: 2,
        userId: 1,
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
