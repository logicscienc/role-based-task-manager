import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");



    // show toast
    toast.success("Logged out successfully");



    // Redirect to login
    setTimeout(() => {
      navigate("/");
    }, 300);
  }
  return (
    <header className="w-full bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-xl font-semibold text-slate-100">
          Task Assignment Dashboard
        </h1>

        {/* Logout Button */}
        <button
        onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-slate-200 border border-slate-600
                     rounded-md hover:bg-slate-800 transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;
