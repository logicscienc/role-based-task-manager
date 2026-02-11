import { useEffect, useState } from "react";
import Header from "../components/Header";
import AgentTaskTable from "../components/AgentTaskTable";
import { API, taskEndpoints } from "../api";

const AgentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await API.get(taskEndpoints.MY_TASKS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <AgentTaskTable tasks={tasks} loading={loading} />
      </div>
    </div>
  );
};

export default AgentDashboard;
