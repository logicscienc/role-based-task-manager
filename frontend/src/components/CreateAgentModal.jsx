import React, { useState } from "react";
import toast from "react-hot-toast";
import { API, agentEndpoints } from "../api";

const CreateAgentModal = ({ onClose, onAgentCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await API.post(
        agentEndpoints.CREATE_API,
        { name, email, mobile, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Agent created successfully");
      onAgentCreated?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container with white bg */}
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 text-gray-800"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;

