import React, { useState } from "react";

import ModalData from "./ModalData";

const MachineTable = ({data, page}) => {
    const [modalDataVisibility, setModalDataVisibility] = useState(false);

    const [modalData, setModalData] = useState(data[0]);

    return (
        <div className="machineTable">
            <table>
                <tr>
                    <th>ID Vasca</th>
                    <th>Stato</th>
                    <th>Riempito il:</th>
                    <th>Stato del Latte</th>
                    <th>Temperatura</th>
                    { page === "pastorizzazione" && <th> Pressione </th>}
                </tr>
                {
                    data.map(({ id, stato, dataOra, statoLatte, umidita, temperatura, pressione }, key) => {
                            return (
                                <tr onClick={() => (setModalData(data[key]), setModalDataVisibility(true))}>
                                    <td> { id } </td>
                                    <td> <span className="stato" id={stato === 0 ? "green_state" : stato === 1 ? "yellow_state" : "red_state"}> </span> </td>
                                    <td> { dataOra } </td>
                                    <td> { page === "stagionatura" ? `${umidita}%` : statoLatte } </td>
                                    <td> { temperatura } </td>
                                    { page === "pastorizzazione" && <td>{pressione} bar</td> }
                                </tr>                                
                            )
                        }
                    )
                }
            </table>

            <ModalData visibility={modalDataVisibility} modalData={modalData} setModalDataVisibility={setModalDataVisibility} />
        </div>
    )
}

export default MachineTable;