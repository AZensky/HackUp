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
        foreignKey: "userId",
      });
      EventAttendee.belongsTo(models.Event, {
        foreignKey: "eventId",
        as: "Attendance",
      });
    }
  }
  EventAttendee.init(
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EventAttendee",
    }
  );
  return EventAttendee;
};
