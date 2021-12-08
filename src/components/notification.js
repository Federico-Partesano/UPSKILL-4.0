import { typeApplied, colors } from "../resources/types";
import milkTank from "../images/milkTank.svg";
import pastourization from "../images/pastourization.svg";
import seasoning from "../images/seasoning.svg";
import success from "../images/succesIcon.svg";
import warning from "../images/allarme.svg";
import redX from "../images/xbuttonRed.svg";

const Notification = ({ element, setNotifications, notifications }) => {
  return (
    <div
      className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200 my-8 py-1 relative"
      style={{ minHeight: 100 }}
    >
      <p
        style={{
          position: "absolute",
          top: 2,
          right: 4,
          cursor: "pointer",
        }}
        onClick={() =>
          setNotifications(
            notifications.filter((notify) => notify.id !== element.id)
          )
        }
      >
        X
      </p>
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
            {`${element.title}`}
            <span style={{ fontSize: 12, fontWeight: "normal" }}>
              {" "}
              {`${element.date}`}
            </span>
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
};

export default Notification;
