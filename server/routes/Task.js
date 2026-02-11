const express = require("express")
const router = express.Router()


const {createTasks, getTasksByAgent} = require("../controllers/Task");


const upload = require("../middlewares/upload");


const { auth, isAgent, isAdmin } = require("../middlewares/auth");

router.post("/upload", auth, isAdmin, upload.single("file"), createTasks); // Admin uploads CSV
router.get("/my-tasks", auth, isAgent, getTasksByAgent); // Agent fetches their own tasks








module.exports = router;