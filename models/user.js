const { Model, DataTypes } = require("sequelize");
// const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    propertyExist(prop) {
      return prop && prop.length;
    }

    async comparePassword(plainPassword) {
      return true;
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true, // Ensures the email field is not empty
          isEmail: true, // Ensures the email field contains a valid email address
        },
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifiedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
