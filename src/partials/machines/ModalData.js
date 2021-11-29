import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import modalClosingButton from "./../../images/Xbutton.svg";
import DashboardCard05 from '../dashboard/DashboardCard05';
import "./css/machines.scss";

const ModalData = ({open, setOpen, selectedElement, setSelectedElement}) => {
    return (
        <Transition.Root show={open} as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">

            <div className="modal_data">
                <div className="modal">
                    <img src={modalClosingButton} id="close_btn" onClick={() => {
                        setOpen(false)
                        setSelectedElement(undefined);
                    }}></img>

                    {selectedElement && <div className="px-10 pb-10">
                        <h1 id="modal_title">Misurazioni RealTime {selectedElement.applied.charAt(0).toUpperCase() + selectedElement.applied.slice(1)}</h1>
                        <DashboardCard05 array={selectedElement.arrayValue} />
                    </div>}
                </div>
            </div>

        </Transition.Root>
    )
}

export default ModalData;