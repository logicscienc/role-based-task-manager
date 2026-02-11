import { useState } from "react";
import Header from "../components/Header";
import UploadCSV from "../components/UploadCSV";
import CreateAgentModal from "../components/CreateAgentModal";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [showAgentModal, setShowAgentModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 mt-20 space-y-12">

        <div className="flex justify-center items-center gap-4">
          <UploadCSV />
          
          <button
            onClick={() => setShowAgentModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add Agent
          </button>
        </div>

      </div>

      {showAgentModal && (
        <CreateAgentModal
          onClose={() => setShowAgentModal(false)}
          onAgentCreated={() => {
            toast.success("Agent added successfully");
            setShowAgentModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;





