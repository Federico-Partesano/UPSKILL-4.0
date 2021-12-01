import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import useWindowDimension from "use-window-dimensions";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Chatbot from "react-best-chatbot";
import Report from "./Report";
import { steps } from "../components/stepsChatBox";
import bot from "./../images/bot.svg";
function Dashboard({ gridDashboard, notifications }) {
  const memo = useMemo(() => (
    <Chatbot
      steps={steps}
      style={{ primaryColor: "#1e293b", secondaryColor: "#6366f1" }}
      options={{
        header: "Marco",
        botAvatarSrc: bot,
        sendingMessageCallback: (e, i) =>
          console.log("e", e.values, "i:", e.timeInMs),
      }}
    />
  ));
  // eslint-disable-next-line
  const { height, width } = useWindowDimension();
  const [page, setPage] = useState();
  // const [dimensionsPage, setDimensionsPage] = useState({with} = useDimensio
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authorized") !== "true") {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log("width", width, "height", height);
    console.log(page);
  }, [page]);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          notifications={notifications}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            notifications={notifications}
          />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              {/* <WelcomeBanner /> */}

              {/* Dashboard actions 
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars 
              <DashboardAvatars />

              /* Right: Actions 
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                /* Filter button 
                <FilterButton />
                /* Datepicker built with flatpickr 
                <Datepicker />
                /* Add view button 
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>
              </div> */}

              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">
                {/* {width > 0 && ( */}
                {!page ? (
                  <>
                    {/* Line chart (Acme Plus) */}
                    {/* <DashboardCard01 /> */}
                    {/* Line chart (Acme Advanced) */}
                    <div
                      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200"
                      onClick={() => setPage("success")}
                      style={{
                        height: 200,
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#92FA41",
                      }}
                    >
                      <DashboardCard01 type="success" array={gridDashboard} />
                    </div>
                    <div
                      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200"
                      onClick={() => setPage("warning")}
                      style={{
                        height: 200,
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#E2DB21",
                      }}
                    >
                      <DashboardCard01 type="warning" array={gridDashboard} />
                    </div>
                    <div
                      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200"
                      onClick={() => setPage("alarm")}
                      style={{
                        height: 200,
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#F10808",
                      }}
                    >
                      <DashboardCard01 type="alarm" array={gridDashboard} />
                    </div>
                    {/* Line chart (Acme Professional) */}
                    {/* <DashboardCard03 /> */}
                    {/* Bar chart (Direct vs Indirect) */}
                    {/* <DashboardCard04 /> */}

                    {/* Doughnut chart (Top Countries) */}
                    {/* <DashboardCard06 /> */}
                    {/* Table (Top Channels) */}
                    <DashboardCard07
                      titleField={[
                        "sensore",
                        "valore",
                        "tipo",
                        "applicato",
                        "stato",
                      ]}
                      array={gridDashboard}
                    />
                    {/* Line chart (Real Time Value) */}
                    {gridDashboard && (
                      <DashboardCard05 array={gridDashboard[0].arrayValue} />
                    )}
                    {/* Line chart (Sales Over Time) */}
                    {/* <DashboardCard08 /> */}
                    {/* Stacked bar chart (Sales VS Refunds) */}
                    {/* <DashboardCard09 /> */}
                    {/* Card (Customers) */}
                    {/* <DashboardCard10 /> */}
                    {/* Card (Reasons for Refunds) */}
                    {/* <DashboardCard11 /> */}
                    {/* Card (Recent Activity) */}
                    {/* <DashboardCard12 /> */}
                    {/* Card (Income/Expenses) */}
                    {/* <DashboardCard13 /> */}
                    {/* Message Chat Box */}
                    {/* <ChatBox /> */}
                    {/* OLD GRID */}
                    {/* {gridDashboard && (
                    <Grid
                      titleField={[
                        "sensori",
                        "stato",
                        "valore",
                        "tipo",
                        "applicato",
                      ]}
                      array={gridDashboard}
                    />
                  )} */}
                  </>
                ) : (
                  <Report
                    array={gridDashboard}
                    status={page}
                    setPage={setPage}
                  />
                )}
              </div>
            </div>
          </main>

          {/* <Banner /> */}
        </div>
      </div>
      {memo}
    </>
  );
}

export default Dashboard;
