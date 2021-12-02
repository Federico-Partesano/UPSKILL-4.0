import React, { useEffect, useState } from "react";
import { arrayDashboardGrid } from "./resources/dataArrayGrid";
import { Routes, Route, useLocation } from "react-router-dom";
import { randomValue } from "./resources/dataArrayGrid";
import {
  notificationCheck,
  generateNotification,
} from "../src/utils/Notification";
import { pNoise } from "./perlinNoise";
import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Notifications from "./pages/Notications";
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const prova = 0;

function App() {
  const [gridDashboard, setgridDashboard] = useState(arrayDashboardGrid);
  const [notifications, setNotifications] = useState([]);

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
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    setNotifications([
      ...gridDashboard
        .filter((s) => notificationCheck(s))
        .map((t) => generateNotification(t)),
    ]);
  }, [gridDashboard]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          exact
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
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
