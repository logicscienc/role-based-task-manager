const express = require("express");
const router = express.Router();

const { createAgent, getAgents } = require("../controllers/Agent");
const { auth, isAdmin } = require("../middlewares/auth");

// Create agent 
router.post("/create", auth, isAdmin, createAgent);
router.get("/", auth, isAdmin, getAgents);


module.exports = router;

