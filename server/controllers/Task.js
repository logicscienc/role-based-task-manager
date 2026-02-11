const Task = require("../models/Task");
const User = require("../models/User"); 
const csv = require("csvtojson");

exports.createTasks = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "CSV file required" });

    // Fetch agents from User model
    const agents = await User.find({ role: "agent" });
    if (agents.length === 0) return res.status(400).json({ message: "No agents available" });

    const tasks = await csv().fromFile(req.file.path);

    let agentIndex = 0;
    const taskDocs = [];

    for (let task of tasks) {
      taskDocs.push({
        firstName: task.firstName,
        phone: task.phone,
        notes: task.notes || "",
        agent: agents[agentIndex]._id,
        uploadedBy: req.user._id,
      });
      agentIndex = (agentIndex + 1) % agents.length;
    }

    await Task.insertMany(taskDocs);

    return res.status(201).json({
      success: true,
      message: "Tasks created and assigned successfully",
      totalTasks: taskDocs.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Task creation failed" });
  }
};


exports.getTasksByAgent = async (req, res) => {
  try {
    // agent fetches their own tasks
    const tasks = await Task.find({ agent: req.user._id })
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};




