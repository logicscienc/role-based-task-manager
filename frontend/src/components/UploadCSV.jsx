import React, { useState } from "react";
import toast from "react-hot-toast";
import {API, taskEndpoints} from "../api";

const UploadCSV = ({onUploadSuccess}) => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

   const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      toast.error("Only CSV files are allowed");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };


  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await API.post(
        taskEndpoints.UPLOAD_API,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Tasks uploaded successfully");

      
      setFile(null);
      setFileName("");

      if (onUploadSuccess) {
      onUploadSuccess();
    }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "CSV upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-850 border border-slate-700 rounded-2xl p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-100 mb-1 text-center">
        Upload CSV
      </h2>

      <p className="text-sm text-slate-400 mb-6 text-center">
        Upload a CSV file to distribute tasks among agents
      </p>

      
      <div className="flex flex-col items-center gap-3">
        <label
          className="w-full text-center cursor-pointer px-4 py-3
                     bg-slate-800 border border-dashed border-slate-600
                     text-slate-200 rounded-lg hover:bg-slate-700 transition"
        >
          Choose File
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <span className="text-xs text-slate-400">
          {fileName || "No file selected"}
        </span>
      </div>

      
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full mt-6 px-6 py-3 rounded-lg font-medium transition
          ${loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {loading ? "Uploading..." : "Upload & Distribute"}
      </button>
    </div>
  );
};

export default UploadCSV;

