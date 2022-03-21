import React, { useEffect, useState } from "react";
import { arrayDashboardGrid } from "./resources/dataArrayGrid";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { randomValue } from "./resources/dataArrayGrid";
import { notificationCheck, generateNotification } from "./utils/Notification";
import { pNoise } from "./perlinNoise";
import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// Import pages
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Notifications from "./pages/Notications";
import Settings from "./pages/Settings";
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function App() {
  const [gridDashboard, setgridDashboard] = useState<any>(arrayDashboardGrid);
  const [fillnotifications, setFillnotifications] = useState(true);

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const random = setInterval(() => {
      // console.log(
      //   "pNoise",
      //   Number((pNoise(50, getRandomArbitrary(0, 9) / 10) * 100).toFixed(2))
      // );
      setgridDashboard(randomValue(true));
    }, 4000);
    return () => {
      clearInterval(random);
    };
  });
  const location = useLocation();

  useEffect(() => {
    document!.querySelector("html")!.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document!.querySelector("html")!.style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    fillnotifications &&
      setNotifications([
        ...gridDashboard
          .filter((s: any) => notificationCheck(s, notifications))
          .map((t: any) => generateNotification(t)),
        ...notifications,
      ]);
  }, [gridDashboard]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/signin" element={<SignIn />}></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              gridDashboard={gridDashboard}
              notifications={notifications}
            />
          }
        ></Route>
        <Route
          path="/vasche_latte"
          element={
            <Machines notifications={notifications} arrayGrid={gridDashboard} />
          }
        />
        <Route
          path="/pastorizzazione"
          element={
            <Machines notifications={notifications} arrayGrid={gridDashboard} />
          }
        />
        <Route
          path="/stagionatura"
          element={
            <Machines notifications={notifications} arrayGrid={gridDashboard} />
          }
        />
        <Route
          path="/notifications"
          element={
            <Notifications
              notifications={notifications}
              arrayGrid={gridDashboard}
              setNotifications={setNotifications}
              setFillNotificaions={setFillnotifications}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              gridDashboard={gridDashboard}
              notifications={notifications}
            />
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />}></Route>
      </Routes>
    </>
  );
}

export default App;
