import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../partials/machines/css/machines.scss";
// import { arrayDashboardGrid, randomValue } from "../resources/dataArrayGrid";
import { typeApplied } from "../resources/types";

//COMPONENTS
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
// import MachineTable from "../partials/machines/MachineTable";
import ModalData from "../components/ModalData";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
// import ReportModalMachine from "../components/ReportModalMachine";
// import DashboardCard05 from "../partials/dashboard/DashboardCard05";

const Machines = ({ arrayGrid, notifications }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);

  const openModal = (element) => {
    setOpen(true);
    setSelectedElement(element);
  };

  useEffect(() => {
    if (localStorage.getItem("authorized") !== "true") {
      navigate("/", { replace: true });
    }
  }, []);

  //console.log(arrayDashboardGrid);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  let title, data;

  const vasche_latte = [
    {
      id: "12df12",
      stato: 0,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 23,
    },

    {
      id: "12df12",
      stato: 2,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 22,
    },

    {
      id: "12df12",
      stato: 1,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 26,
    },
  ];

  const pastorizzazione = [
    {
      id: "12df12",
      stato: 0,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 23,
      pressione: 1.2,
    },

    {
      id: "12df12",
      stato: 2,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 22,
      pressione: 0.9,
    },

    {
      id: "12df12",
      stato: 1,
      dataOra: "15/12/22 12:30",
      statoLatte: "Ok",
      temperatura: 26,
      pressione: 1.4,
    },
  ];

  const stagionatura = [
    {
      id: "12df12",
      stato: 0,
      dataOra: "15/12/22 12:30",
      umidita: 40,
      temperatura: 23,
    },

    {
      id: "12df12",
      stato: 2,
      dataOra: "15/12/22 12:30",
      umidita: 40,
      temperatura: 22,
    },

    {
      id: "12df12",
      stato: 1,
      dataOra: "15/12/22 12:30",
      umidita: 40,
      temperatura: 26,
    },
  ];

  switch (page) {
    case "vasche_latte":
      title = "Vasche del Latte";
      data = arrayGrid.filter(
        ({ applied }) => applied === typeApplied.milkTank
      );
      break;

    case "pastorizzazione":
      title = "Pastorizzazione";
      data = arrayGrid.filter(
        ({ applied }) => applied === typeApplied.pasteurization
      );
      break;

    case "stagionatura":
      title = "Stanze di Stagionatura";
      data = arrayGrid.filter(
        ({ applied }) => applied === typeApplied.seasoning
      );
      break;
    default:
      break;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        notifications={notifications}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          notifications={notifications}
        />

        <div className="machines p-10">
          <h1 id="title"> {title} </h1>

          <ModalData
            array={data}
            open={open}
            setOpen={setOpen}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />

          <DashboardCard07
            report
            titleField={["sensore", "valore", "tipo", "applicato", "stato"]}
            array={data}
            openModal={openModal}
          />

          {/*<ReportModalMachine
                    array={data}
                    open={open}
                    setOpen={setOpen}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    />

                    selectedElement && <DashboardCard05 array={selectedElement.arrayValue} />*/}
        </div>
      </div>
    </div>
  );
};

export default Machines;
