import React from "react";

function DashboardCard07({ titleField, array }) {
  return (
    // xl:col-span-8
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Lista sensori</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">{titleField[0]}</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[1]}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[2]}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[3]}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    {titleField[4]}
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {array.map((element) => {
                return (
                  <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-gray-800">{element.id}</div>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center">{element.sensorValue}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{element.type}</div>
                    </td>
                    <td className="p-2">
                      {/* text-light-blue-500 */}
                      <div className="text-center ">{element.applied}</div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: element.status,
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {/* Row */}
              {/* Row */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
