const jwt = require("jsonwebtoken");
const User_Model = require("../models/User_Model");

const logged_on = async (req, res, next) => {
  try {
    // This should be turned off for testing
    const { authorization } = req.headers;
    if (!authorization) {
      throw Error('You must send an authorization header');
    }
    // const token = authorization.split(' ')[1];
    const token = authorization;

    // const token = Users_Type();
    const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
    req._user = await User_Model.findById(id).select("_id role");
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

// This function is for testing purposes only
const Users_Type = () => {
  userType = "trainer";
  switch (userType) {
    case "member":
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWJiNmNkNTIxNDhjY2I4OGFmOGFmMyIsImlhdCI6MTcwMDc2Nzk2NSwiZXhwIjoxNzAxOTc3NTY1fQ.JFMbrG96O67u7VBv88uSN40Ao4_KwiPVoEECP6QVnRg";
    case "trainer":
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxYWU2ODA3NzkxNGEyNzUyOWYwNiIsImlhdCI6MTcwMDc2Nzg5MiwiZXhwIjoxNzAxOTc3NDkyfQ.aPhZG256C4r_uw8BLR8Zszx0JPXNPXaMeJBl4HWJros";
    case "manager":
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxYWE4ODA3NzkxNGEyNzUyOWYwMyIsImlhdCI6MTcwMDc2Nzg3MywiZXhwIjoxNzAxOTc3NDczfQ._clgp0duj00S3tC9ysIDM9uXzwD_5JktGhB4mLMHhYU";
    default:
      return null;
  }
};

module.exports = { logged_on, staff, manager, trainer };
