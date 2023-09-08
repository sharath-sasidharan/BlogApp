const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill the required fields",
      });
    }
    // Exisiting user
    const existing_user = await userModel.findOne({ email });
    if (existing_user) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new User
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({
      message: "User Created",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//list users
exports.getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(201).json({
      Count: user.length,
      message: "User List Fetched",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill the required fields",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not registered",
      });
    }

    //Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email or password is incorrect",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login Success",
      success: true,
      user,
    });
  } catch (err) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
