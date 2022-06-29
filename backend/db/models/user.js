"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // toSafeObject will return an object with only the user instance information that is safe to save to a JWT
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    //validatePassword accepts a password, returns true if there is a match with the User's hashedPassword
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    //static method (accessible directly from object constructor rather than instance), uses currentUser scope to return a User with that id.
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    // login method searches for one user with specified crediential (username/email), and if found, validates the password. If the password is valid, returns the user by using currentUser scope.
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    // signup accepts an object with a username, email, and password. It hashes and salts the password using bcrypt hashSync. It then creates a user, and returns the created user.
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      //create scopes to prevent user's sensitive information from being sent
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
