const { where } = require("sequelize");
const { User } = require("../models");

class UserService {
  static findBy(data) {
    return new Promise((resolve, reject) => {
      User.findOne(data)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static delete(condition) {
    return new Promise((resolve, reject) => {
      User.destroy(condition)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      User.create(data)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static update(data, condition) {
    return new Promise((resolve, reject) => {
      User.update(data, condition )
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = UserService;
