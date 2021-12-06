import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import milkTank from "../images/milkTank.svg";
import pastourization from "../images/pastourization.svg";
import seasoning from "../images/seasoning.svg";

import success from "../images/succesIcon.svg";
import warning from "../images/allarme.svg";
import redX from "../images/xbuttonRed.svg";
import "../pages/css/notifications.scss";
import { colors, typeApplied } from "../resources/types";

export default function Notications({ arrayGrid, notifications }) {
  const [notificationsArray, setNotificationsArray] = useState(notifications);

  const [page, setPage] = useState();
  // const [dimensionsPage, setDimensionsPage] = useState({with} = useDimensio
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authorized") !== "true") {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    setNotificationsArray(notifications);
  }, [notifications]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        notifications={notifications}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <h1 id="title-notifications" className="py-0 my-0">
          Notifiche
        </h1>
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          {notificationsArray &&
            notificationsArray.map((element) => {
              return (
                <div
                  className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200 my-8 py-1 relative"
                  style={{ minHeight: 100 }}
                >
                  <p style={{ position: "absolute", top: 2, right: 4 }}>X</p>
                  <div
                    className=" flex flex-row sm:justify-center md:justify-between  flex-wrap my-justify-center"
                    style={{ minHeight: 100 }}
                  >
                    <span className="justify-self-center self-center pl-2">
                      <img
                        src={
                          element.applied === typeApplied.milkTank
                            ? milkTank
                            : element.applied === typeApplied.pasteurization
                            ? pastourization
                            : seasoning
                        }
                        style={{ width: 50 }}
                        alt={"success"}
                      ></img>
                    </span>
                    <div className="flex flex-col max-width">
                      <h1
                        className="text-center"
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      >
                        {element.title}
                      </h1>
                      <p className="text-center">
                        {element.errors.message1 && (
                          <>
                            {element.errors.message1} <br />
                          </>
                        )}

                        {element.errors.message2}
                      </p>
                    </div>
                    <div className="justify-self-center self-center pr-2">
                      <img
                        src={
                          element.status === colors.success
                            ? success
                            : element.status === colors.warning
                            ? warning
                            : redX
                        }
                        style={{ width: 50 }}
                        alt={"success"}
                      ></img>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
