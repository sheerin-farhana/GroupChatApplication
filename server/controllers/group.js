const { Group, GroupMembership } = require("../models/Group");
const { User } = require("../models/User");

const getGroupMembers = async (req, res, next) => {
  const groupId = req.params.groupId; // assuming groupId is passed in the URL

  try {
    // Find the group
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          through: { attributes: [] }, // Exclude extra attributes from the join table
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ success: false, msg: "Group not found" });
    }

    // Extract the users from the group
    const groupMembers = group.Users;

    res.status(200).json({
      success: true,
      msg: "Group members fetched",
      groupMembers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const postGroup = async (req, res, next) => {
  const { name, users } = req.body;

  try {
    // Create a new group instance
    const newGroup = await Group.create({
      name,
    });

    // Add users to the newly created group
    if (users && users.length > 0) {
      const groupUsers = await User.findAll({
        where: {
          id: users,
        },
      });

      await newGroup.addUsers(groupUsers);
    }

    res.status(201).json({ group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserGroups = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const userGroups = await Group.findAll({
      include: [
        {
          model: User,
          through: { attributes: [] }, // Exclude extra attributes from the join table
          where: { id: userId },
        },
      ],
    });

    res
      .status(200)
      .json({ success: true, msg: "User groups fetched", userGroups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  getUserGroups,
  postGroup,
  getGroupMembers,
};
