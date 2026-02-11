require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const agentRoutes = require("./routes/Agent");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/agents", agentRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
