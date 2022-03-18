import React, { FC, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

const Settings: FC<{ notifications: any }> = ({ notifications }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        notifications={notifications}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          notifications={notifications}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </div>
  );
};

export default Settings;
