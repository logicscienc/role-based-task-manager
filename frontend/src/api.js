import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ================= AUTH =================
export const authEndpoints = {
  LOGIN_API: "/auth/login",
};

// ================= AGENTS =================
export const agentEndpoints = {
  CREATE_API: "/agents/create",   // POST (Admin)
  GET_API: "/agents",             // GET (Admin)
};

// ================= TASKS =================
export const taskEndpoints = {
  UPLOAD_API: "/tasks/upload",     // POST (Admin)
  MY_TASKS_API: "/tasks/my-tasks", // GET (Agent)
};




