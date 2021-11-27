import React, { Fragment, useState, useEffect, useRef } from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import { colors } from "../resources/types";
import { Dialog, Transition } from '@headlessui/react';
import successImg1 from "../images/succesIcon.svg";
import warningImg1 from "../images/allarme.svg";
import redXImg1 from "../images/xbuttonRed.svg";
import modalClosingButton from "../images/Xbutton.svg";

const Report = ({ array, status, setPage }) => {
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(undefined);
  const cancelButtonRef = useRef(null);
  const state = status === "success" ? colors.success : status === "warning" ? colors.warning : colors.alarm;
  const image = status === "success" ? successImg1 : status === "warning" ? warningImg1 : redXImg1;

  const openModal = (id) => {
    setOpen(true); //open the modal component
    const found = array.find(element => element.id === id); //select the element in the clicked row
    found && setSelectedElement(found); //update selectedElement state
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
        }}>
        {status && <DashboardCard01 type={status} array={array} />}
      </div>
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style={{ paddingBottom: 40 }}>
                  <div className="mb-7">
                    <img src={modalClosingButton} style={{ width: 40 }} alt={state} onClick={() => setOpen(false)}></img>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center" style={{ paddingBottom: 40 }}>
                        {selectedElement && `Sensore di ${selectedElement.type} ${selectedElement.id}`}
                      </Dialog.Title>
                      <img src={image} style={{ width: 80, margin: "auto", paddingBottom: 40 }} alt={state}></img>
                      <div className="mt-2" style={{ paddingBottom: 40 }}>
                        <p className="text-sm text-gray-500 text-center font-bold">
                          {selectedElement && `Il sensore di ${selectedElement.type} ${selectedElement.id} applicato a ${selectedElement.applied} registra valori ${status === "success" ? 'nella norma' : status === "warning" ? 'prossimi al limite' : 'fuori norma'}: ${selectedElement.sensorValue}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Report;
