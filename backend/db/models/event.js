"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.belongsToMany(models.User, {
        through: models.EventAttendee,
        // onDelete: "CASCADE",
        // hooks: true,
        // as: "Attendance",
      });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });
      Event.hasMany(models.Image, { foreignKey: "eventId" });
    }
  }
  Event.init(
    {
      groupId: DataTypes.INTEGER,
      venueId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      numAttending: DataTypes.INTEGER,
      previewImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
