const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Message = sequelize.define("Messages", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Message };
