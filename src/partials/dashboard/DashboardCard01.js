import { useState, useEffect, useLayoutEffect } from "react";
// Import utilities
import success from "../../images/success.svg";
import warning from "../../images/warning.svg";
import redX from "../../images/x.svg";
import { countWorkingSensors } from "../../resources/dataArrayGrid";
import { colors } from "../../resources/types";

const typeCard = {
  success: {
    image: success,
    text: "perfettamente funzionante",
    color: colors.success,
  },
  warning: { image: warning, text: "da revisionare", color: colors.warning },
  alarm: { image: redX, text: "problema rilevato", color: colors.alarm },
};

function DashboardCard01({ array, type }) {
  const [countSensors, setCountSensors] = useState();

  useLayoutEffect(() => {
    setCountSensors(countWorkingSensors(array, typeCard[type].color));
    // eslint-disable-next-line
  }, [array]);

  return (
  <>
      <div className="px-5 pb-5">
        {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">Acme Plus</h2> */}
        <img src={typeCard[type].image} style={{ width: 50 }} alt={type}></img>
      </div>
      <div className="flex items-start">
        <div className="text-3xl font-bold text-gray-800">
          {countSensors ? countSensors + "%" : 0 + "%"}
        </div>
      </div>
      <div className="text-md font-semibold text-gray-600 mb-1 ml-5 mr-5">
        {typeCard[type].text}
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* <div className="flex-grow">
       Change the height attribute to adjust the chart height 
      </div> */}
  </>
  );
}

export default DashboardCard01;
