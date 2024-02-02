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
  imageUrl: {
    type: Sequelize.STRING, // For image URLs or keys
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Message };
