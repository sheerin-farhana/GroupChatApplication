const express = require("express");
const route = express.Router();

const { signup, login, getAllUsers } = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const {
  postMessage,
  getAllMessages,
  getAllGroupMessages,
  postGroupMessage,
} = require("../controllers/message");
const {
  getUserGroups,
  postGroup,
  getGroupMembers,
  updateGroup,
  deleteGroup,
} = require("../controllers/group");

route.post("/signup", signup);
route.post("/login", login);
route.get("/", getAllUsers);

route.post("/message", authenticate, postMessage);
route.post("/groups/:groupId/messages", authenticate, postGroupMessage);

route.post("/groups", authenticate, postGroup);
route.get("/groups", authenticate, getUserGroups);
route.get("/groups/:groupId/messages", authenticate, getAllGroupMessages);
route.get("/groups/:groupId/members", getGroupMembers);

route.put("/groups/:groupId", authenticate, updateGroup);

route.post("/groups/:groupId", deleteGroup);

module.exports = route;
