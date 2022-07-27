"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
        as: "Organizer",
      });

      Group.belongsToMany(models.User, {
        through: models.GroupMember,
        as: "Members",
      });

      Group.hasMany(models.Event, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Group.hasMany(models.Venue, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Group.hasMany(models.Image, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Group.init(
    {
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 60],
            msg: "Name must be 60 characters or less",
          },
        },
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [50, 10000],
            msg: "About must be 50 characters or more",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   onlineOrInPerson(value) {
        //     if (!(value === "Online" || value === "In person")) {
        //       throw new Error("Type must be online or in person");
        //     }
        //   },
        // },
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          isBoolean(value) {
            if (typeof value !== "boolean") {
              throw new Error("Private must be true or false");
            }
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // numMembers: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
      previewImage: {
        type: DataTypes.STRING,
      },
      // image_id: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
