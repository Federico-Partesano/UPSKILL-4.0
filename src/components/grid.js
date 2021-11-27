import React, { useState, useRef } from "react";

const Grid = ({ titleField, array }) => {
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <table
        class=" border border-black-800 table-auto"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            {titleField.map((element) => {
              return <th class="border border-black-600 ... p-2">{element}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {array.map((element) => {
            return (
              <tr>
                <td class="border border-black-600 p-2">{element.id}</td>
                <td class="border border-black-600 p-2 flex justify-center">
                  <div
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                      backgroundColor: element.status,
                    }}
                  ></div>
                </td>
                <td class="border border-black-600 p-2">
                  {element.sensorValue}
                </td>
                <td class="border border-black-600 p-2">{element.type}</td>
                <td class="border border-black-600 p-2">{element.applied}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
