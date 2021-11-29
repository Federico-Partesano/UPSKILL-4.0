import React, { useEffect, useState } from "react";
import { arrayDashboardGrid } from "./resources/dataArrayGrid";
import { Routes, Route, useLocation } from "react-router-dom";
import { randomValue } from "./resources/dataArrayGrid";
import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";

function App() {
  const [gridDashboard, setgridDashboard] = useState(arrayDashboardGrid);

  useEffect(() => {
    const random = setInterval(() => {
      setgridDashboard(randomValue());
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

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard gridDashboard={gridDashboard} />}
        ></Route>

        <Route path="/vasche_latte" element={<Machines arrayGrid={gridDashboard} />}/>
        <Route path="/pastorizzazione" element={<Machines arrayGrid={gridDashboard} />} />
        <Route path="/stagionatura" element={<Machines arrayGrid={gridDashboard} />} />
      </Routes>
    </>
  );
}

export default App;
