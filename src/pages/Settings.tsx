import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import ModalDataSettings from "../components/ModalDataSettings";
import { getUrlApi } from "../endpoints";
import useFetch from "../hooks/useFetch";
import TableSettings from "../partials/dashboard/TableSettings";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { typeSensor } from "../resources/types";
import { getStorageItem } from "../utils/localStorage";
import "./Settings.scss";
const Settings: FC<{ gridDashboard: any; notifications: any }> = ({
  gridDashboard,
  notifications,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<any>();

  const [stampData, setStampData] = useState<any>();

  const openModal = (element: any) => {
    setOpen(true);
    setSelectedElement(element);
  };

  const getData = async () => {
    setIsLoading(true);

    try {
      setData(
        (
          await axios.get(getUrlApi("sensors/ranges"), {
            headers: {
              Authorization: `Bearer ${getStorageItem("tokenJwt")}`,
            },
          })
        ).data.payload
      );
    } catch (error) {
      console.log("GET DATA ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const renderTitle = () => {
    return <h1 id="title"> Impostazioni </h1>;
  };
  const renderTable = (title: string, data: any) => {
    const filtered: string[] = gridDashboard.map((element: any) => element);

    //console.log("ARRAY GRID: ", new Set(filtered));

    return (
      <div>
        <TableSettings
          title={title}
          titleField={["ID", "Macchinari", "Tipo", "Min", "Max", "Azioni"]}
          openModal={openModal}
          array={data}
        />
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {    
    data &&
      setStampData({
        milkTank: data.filter(
          ({ machine: { typology } }: { machine: { typology: string } }) =>
            typology === "Milk_Tank" ||  typology === "'Milk_Tank"
        ),

        pasteurization: data.filter(
          ({ machine: { typology } }: { machine: { typology: string } }) =>
            typology === "Pasteurization"
        ),

        seasoning: data.filter(
          ({ machine: { typology } }: { machine: { typology: string } }) =>
            typology === "Seasoning"
        ),
      });
  }, [data]);

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
        {stampData && (
          <div className="machines p-10">
            {renderTitle()}
            {renderTable("Vasche del latte", stampData.milkTank)}
            {renderTable("Pastorizzazione", stampData.pasteurization)}
            {renderTable("Stagionatura", stampData.seasoning)}

            <ModalDataSettings
              array={data}
              setData={setData}
              open={open}
              setOpen={setOpen}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              setIsLoading={setIsLoading}
            />
            {/* {renderTitlePage()} */}
            {/* <D7
            title="Lista macchinari"
            report
            titleField={["macchinari", "tipo", "min", "max", "Azioni"]}
            array={data}
            openModal={openModal}
          /> */}
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Settings;
