import React from "react";

const AgentTaskTable = ({ tasks = [] }) => {
  return (
    <div className="mt-10 bg-slate-850 border border-slate-700 rounded-2xl p-6 shadow-lg">
      
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Assigned Tasks
      </h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-slate-400">
          No tasks assigned yet. Upload a CSV to see tasks here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs uppercase bg-slate-800 text-slate-400">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-800 transition"
                >
                  <td className="px-4 py-3">{task.firstName}</td>
                  <td className="px-4 py-3">{task.agent?.name || "Unassigned"}</td>
                  <td className="px-4 py-3">{task.phone}</td>
                  <td className="px-4 py-3">{task.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentTaskTable;
