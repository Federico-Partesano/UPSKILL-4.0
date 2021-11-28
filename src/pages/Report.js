import React, { Fragment, useState, useEffect, useRef } from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import { colors } from "../resources/types";
import successImg1 from "../images/succesIcon.svg";
import warningImg1 from "../images/allarme.svg";
import redXImg1 from "../images/xbuttonRed.svg";
import ReportModal from "../components/ReportModal";

const Report = ({ array, status, setPage }) => {
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);
  const state = status === "success" ? colors.success : status === "warning" ? colors.warning : colors.alarm;
  const image = status === "success" ? successImg1 : status === "warning" ? warningImg1 : redXImg1;

  const openModal = (element) => {
    setOpen(true);
    setSelectedElement(element);
  }

  console.log(state);
  console.log("Sensor 1: ", array.find(element => element.id === 1));
  return (
    <>
      <button class="bg-blue-800 hover:bg-blue-1000 text-white font-bold py-2 px-4 rounded" style={{ width: 100 }} onClick={() => setPage()}>
        Indietro
      </button>
      <div
        className="flex flex-col col-span-full xl:col-span-12 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200"
        style={{
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: state,
        }}> {status && <DashboardCard01 type={status} array={array} />} </div>

      {array && <DashboardCard07
        titleField={[
          "sensore",
          "valore",
          "tipo",
          "applicato",
          "stato",
        ]}
        array={array.filter(({ status }) => status === state)}
        openModal={openModal}
      />}
      
      <ReportModal open={open} setOpen={setOpen} selectedElement={selectedElement} state={state} image={image} status={status}/>
    </>
  );
};

export default Report;
