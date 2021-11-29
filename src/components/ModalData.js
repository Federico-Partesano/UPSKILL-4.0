import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import modalClosingButton from "./../images/Xbutton.svg";
import successImg1 from "../images/succesIcon.svg";
import warningImg1 from "../images/allarme.svg";
import redXImg1 from "../images/xbuttonRed.svg";
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import "./../css/modal.scss";
const R = ({selectedElement}) => {
    return (<div className="px-10 pb-10">
    <h1 id="modal_title">Misurazioni RealTime {selectedElement.applied.charAt(0).toUpperCase() + selectedElement.applied.slice(1)}</h1>
    <DashboardCard05 array={selectedElement.arrayValue} />
</div>)
}

const T = ({found} ) => {

    return (    <div className="sm:flex sm:items-start">
    <div className="mt-3 text-center sm:mt-0 sm:text-left">
        <h3  className="text-lg leading-6 font-medium text-gray-900 text-center" style={{ paddingBottom: 40 }}>
            {found && `Sensore di ${found.type} ${found.id}`}
        </h3>
        <img alt="color" src={found && (found.status === "#92FA41" ? successImg1 : found.status === "#E2DB21" ? warningImg1 : redXImg1)} style={{ width: 80, margin: "auto", paddingBottom: 40 }}></img>
        <div className="mt-2" style={{ paddingBottom: 30 }}>
            <p className="text-sm text-gray-500 text-center font-bold">
                {found && `Il sensore di ${found.type} ${found.id} applicato a ${found.applied} registra valori ${found.status === "#92FA41" ? 'nella norma' : found.status === "#E2DB21" ? 'prossimi al limite' : 'fuori norma'}: ${found.sensorValue}`}
            </p>
        </div>
    </div>
</div>)
}
const ModalData = ({open, setOpen, selectedElement, setSelectedElement, report, array}) => {
    const cancelButtonRef = useRef(null);
    const found = (selectedElement && report && array ) && array.find(element => element.id === selectedElement.id);
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
                    <img alt="btn" src={modalClosingButton} id="close_btn" onClick={() => {
                        setOpen(false)
                        setSelectedElement(undefined);
                    }}/>

                    {selectedElement && <div className="px-10 pb-10">
                        { !report ? ( <R selectedElement={selectedElement} />) : (<T found={found}/>)}
                    </div>}
                </div>
            </div>

        </Transition.Root>
    )
}

export default ModalData;