const jwt = require("jsonwebtoken");
const User_Model = require("../models/User_Model");

const logged_on = async (req, res, next) => {
  try {
    // This should be turned off for testing
    const { authorization } = req.headers;
    if (!authorization) {
      throw Error("You must send an authorization header");
    }
    //const token = authorization.split(" ")[1];
    const token = authorization;

    const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req._user = await User_Model.findById(id).select("_id role");
    console.log(req._user._id);
    console.log(req._user.role);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
};

const staff = async (req, res, next) => {
  if (req._user.role !== "trainer" && req._user.role !== "manager") {
    return res.status(401).json({
      success: false,
      error: "This resource is only accessible to staff members",
    });
  }
  next();
};

const trainer = async (req, res, next) => {
  if (req._user.role !== "trainer") {
    return res.status(401).json({
      success: false,
      error: "This resource is only accessible to trainer",
    });
  }
  next();
};

const manager = async (req, res, next) => {
  if (req._user.role !== "manager") {
    return res.status(401).json({
      success: false,
      error: "This resource is only accessible to managers",
    });
  }
  next();
};

module.exports = { logged_on, staff, manager, trainer };
