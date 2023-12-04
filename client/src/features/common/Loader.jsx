import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 min-w-screen dark:bg-gray-900">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full dark:bg-slate-100" />
        <div className="w-3 h-3 bg-gray-500 rounded-full dark:bg-slate-100" />
        <div className="w-3 h-3 bg-gray-500 rounded-full dark:bg-slate-100" />
      </div>
    </div>
  );
};

export default Loader;
