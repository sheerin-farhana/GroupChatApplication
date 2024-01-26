const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("./models/User");
const { Message } = require("./models/Message");
const { Group, GroupMembership } = require("./models/Group");

const sequelize = require("./Utils/database");
const userRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);

// Schema relationships
User.belongsToMany(Group, { through: GroupMembership });
Group.belongsToMany(User, { through: GroupMembership });

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("app is running");
    });
  })
  .catch((err) => console.log(err));
