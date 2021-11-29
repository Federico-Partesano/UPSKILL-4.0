import React, { useState } from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import { colors } from "../resources/types";
import ReportModal from "../components/ReportModal";
import ModalData from "../components/ModalData";

const Report = ({ array, status, setPage }) => {
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);
  const state = status === "success" ? colors.success : status === "warning" ? colors.warning : colors.alarm;

  const openModal = (element) => {
    setOpen(true);
    setSelectedElement(element);
  }

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

      <ModalData
        report
        array={array}
        open={open}
        setOpen={setOpen}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
    </>
  );
};

export default Report;
