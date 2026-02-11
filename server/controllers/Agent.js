const User = require("../models/User");
const bcrypt = require("bcrypt");

// Admin creates agent
exports.createAgent = async (req, res) => {
  try {
    
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: only Admin can create agents",
      });
    }

    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user with email already exists
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Agent already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await User.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
      role: "agent", 
    });

    return res.status(201).json({
      success: true,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        role: agent.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create agent",
    });
  }
};


exports.getAgents = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: only Admin can view agents",
      });
    }

    const agents = await User.find({ role: "agent" }).select("-password");

    return res.status(200).json({
      success: true,
      agents,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch agents",
    });
  }
};
