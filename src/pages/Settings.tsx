import React, { FC, useState, useEffect } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import D7 from "../partials/dashboard/d7";
import "./Settings.scss";
const Settings: FC<{ gridDashboard: any, notifications: any }> = ({ gridDashboard, notifications }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);

  const openModal = (element: any) => {
    setOpen(true);
    setSelectedElement(element);
  };

  useEffect(() => {
    const filtered: string[] = gridDashboard.map((element: any) => element.applied);
   console.log('arrayGrid', new Set(filtered));
   
  }, [gridDashboard])
  

    const renderTitle = () => {
      return (
        <h1 id="title"> {'Impostazioni'} </h1>
      )
    }
    const renderTable = () => {
      return (
        <h1 className="title">{'I tuoi macchinari'}</h1>
      )
    }
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
           <div className="machines p-10">
        
        {renderTitle()}
        {/* {renderTitlePage()} */}
        {/* <D7
            title="Lista macchinari"
            report
            titleField={["macchinari", "tipo", "min", "max", "Azioni"]}
            array={data}
            openModal={openModal}
          /> */}
        </div>

      </div>
    </div>
  );
};

export default Settings;
