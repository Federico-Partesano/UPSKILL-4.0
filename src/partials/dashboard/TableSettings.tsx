import React from "react";
import { typeSensor } from "../../resources/types";

import editImage from "./../../images/edit.png";

import "./TableSettings.scss";

function TableSettings({
  titleField,
  array,
  openModal,
  report,
  title = "Lista sensori",
  machines = false,
}: {
  titleField: string[];
  array: any;
  openModal: (element: any) => void;
  report?: any;
  title?: string;
  machines?: boolean;
}) {
  return (
    // xl:col-span-8
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200 my-5">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                {titleField.map((title: string) => (
                  <th className="p-2">
                    <div className="font-semibold text-center">{title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {array.length &&
                array.map((element: any) => {
                  const {
                    id,
                    machine,
                    typology,
                    range: { min, max },
                  } = element;

                  return (
                    <tr style={report && { cursor: "pointer" }}>
                      <td className="p-2">
                        {/* text-light-blue-500 */}
                        <div className="text-center ">{id}</div>
                      </td>

                      {!machines && (
                        <td className="p-2">
                          {/* text-light-blue-500 */}
                          <div className="text-center ">{machine.typology}</div>
                        </td>
                      )}

                      <td className="p-2">
                        <div className="text-center">{typology}</div>
                      </td>

                      <td className="p-2">
                        <div className="text-center">
                          {`${min}${
                            typology === typeSensor.temperature
                              ? "°"
                              : typology === typeSensor.pressure
                              ? " Pa"
                              : " g/m³"
                          }`}
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="text-center">
                          {`${max}${
                            typology === typeSensor.temperature
                              ? "°"
                              : typology === typeSensor.pressure
                              ? " Pa"
                              : " g/m³"
                          }`}
                        </div>
                      </td>

                      <td className="edit-icon-container">
                        <button
                          onClick={() => openModal(element)}
                          id="edit-icon-btn"
                        >
                          <img id="edit-icon" alt="edit-icon" src={editImage} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {/* Row */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableSettings;
