"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventAttendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventAttendee.belongsTo(models.User, {
        foreignKey: "UserId",
        // onDelete: "CASCADE",
        // hooks: true,
      });
      EventAttendee.belongsTo(models.Event, {
        foreignKey: "EventId",
        as: "Attendance",
        // onDelete: "CASCADE",
        // hooks: true,
      });
    }
  }
  EventAttendee.init(
    {
      UserId: DataTypes.INTEGER,
      EventId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "EventAttendee",
    }
  );
  return EventAttendee;
};
