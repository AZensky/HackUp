"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Event, { foreignKey: "eventId" });
      Image.belongsTo(models.Group, { foreignKey: "groupId" });
      Image.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Image.init(
    {
      url: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
