import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import modalClosingButton from "../images/Xbutton.svg";
import successImg1 from "../images/succesIcon.svg";
import warningImg1 from "../images/allarme.svg";
import redXImg1 from "../images/xbuttonRed.svg";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";

const ReportModalMachine = ({
  array,
  open,
  setOpen,
  selectedElement,
  setSelectedElement,
}) => {
  const cancelButtonRef = useRef(null);
  const found =
    selectedElement &&
    array.find((element) => element.id === selectedElement.id);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                <div
                  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  style={{ paddingBottom: 30 }}
                >
                  <div className="mb-7">
                    <img
                      src={modalClosingButton}
                      style={{ width: 40 }}
                      onClick={() => {
                        setOpen(false);
                        setSelectedElement(undefined);
                      }}
                    ></img>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      {selectedElement && (
                        <DashboardCard05 array={selectedElement.arrayValue} />
                      )}
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

export default ReportModalMachine;
