import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import milkTank from "../images/milkTank.svg";
import pastourization from "../images/pastourization.svg";
import seasoning from "../images/seasoning.svg";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import success from "../images/succesIcon.svg";
import warning from "../images/allarme.svg";
import redX from "../images/xbuttonRed.svg";
import "../pages/css/notifications.scss";
import { colors, typeApplied } from "../resources/types";
import Notification from "../components/notification";
import "./transition.scss";

export default function Notications({
  arrayGrid,
  notifications,
  setNotifications,
  setFillNotificaions,
}) {
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

  const HandlerClickTrash = () => {
    setNotifications([]);
    setFillNotificaions(false);
  };

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
        <div
          style={{
            cursor: "pointer",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EA4D4D",
            position: "fixed",
            width: 60,
            height: 60,
            bottom: 20,
            right: 20,
            zIndex: 100,
          }}
          onClick={HandlerClickTrash}
        >
          <svg
            width="25"
            height="35"
            viewBox="0 0 39 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 14C1 14.9801 1 15.8338 1.14252 16.6769C2.23882 27.2157 3.41185 37.7546 4.53007 48.2935C4.54965 48.9385 4.70299 49.5733 4.98111 50.1606C5.25923 50.748 5.65653 51.276 6.14971 51.7138C6.64289 52.1516 7.22204 52.4903 7.85318 52.7101C8.48432 52.9299 9.15476 53.0264 9.82518 52.9938C16.1983 52.9938 22.5715 52.9938 28.9446 52.9938C32.2335 52.9938 34.0643 51.139 34.4261 48.03C35.2264 40.1153 36.1144 32.2217 36.9585 24.2859C37.3093 20.903 37.6492 17.5094 38 14.0105L1 14ZM13.6622 45.3953C13.239 46.1016 12.7431 46.7654 12.1822 47.3766C11.5902 46.7759 10.6255 46.2384 10.4939 45.5534C10.2103 43.6145 10.0419 41.6616 9.98963 39.7043C9.57304 33.5285 9.1601 27.3563 8.75081 21.1875C8.75081 20.8187 8.75081 20.4498 8.75081 20.0809C8.64118 18.9322 8.81659 17.8678 10.2418 17.794C11.667 17.7202 11.8972 18.6582 11.963 19.7648C12.1164 22.0201 12.3357 24.2754 12.5001 26.5413C12.8729 32.3095 13.2566 38.0497 13.6513 43.7618C13.7808 44.2988 13.7845 44.8567 13.6622 45.3953ZM21.0841 45.0791C21.0841 46.2173 20.8978 47.3028 19.4836 47.345C18.0693 47.3871 17.8172 46.3227 17.8172 45.1634C17.8172 36.7323 17.8172 28.3329 17.8172 19.965C17.8172 18.7952 18.1022 17.7518 19.5055 17.794C20.9087 17.8362 21.1061 18.9217 21.1061 20.0599C21.1061 24.2754 21.1061 28.3961 21.1061 32.5695C21.1061 36.7429 21.1061 40.9057 21.1061 45.0791H21.0841ZM30.1724 20.4393C30.1724 20.5341 30.1724 20.6184 30.1724 20.6816C30.1724 20.8608 30.1724 20.8292 30.1724 20.6816C29.6133 29.1127 29.0761 37.0801 28.5499 45.0054C28.4622 46.2279 28.1991 47.5558 26.5766 47.2818C26.0065 47.1869 25.2391 45.9644 25.261 45.2688C25.4255 40.8741 25.7653 36.4689 26.0613 32.0742C26.3391 28.0975 26.6278 24.1279 26.9274 20.1652C27.0151 19.0481 27.1028 17.7413 28.6705 17.8045C30.2382 17.8678 30.2382 19.2378 30.1724 20.4393Z"
              fill="white"
            />
            <path
              d="M35.5712 7.26311C33.2573 7.26311 30.9434 7.26311 28.3665 7.26311C28.3665 5.76936 28.4296 4.45962 28.3665 3.1607C28.2508 0.995837 27.5672 0.119067 25.4846 0.0757702C21.5089 -0.0252567 17.5332 -0.0252567 13.5574 0.0757702C11.6011 0.0757702 10.6966 1.1582 10.5599 3.17152C10.4652 4.47044 10.5599 5.76936 10.5599 7.26311C7.96197 7.26311 5.64806 7.26311 3.33414 7.26311C1.02023 7.26311 0 8.31307 0 10.1099C0 11.9067 1.23058 13 3.34466 13C14.1149 13 24.8851 13 35.6553 13C37.7589 13 39 11.9176 39 10.0991C39 8.2806 37.7063 7.28476 35.5712 7.26311ZM24.4223 7.1224H14.3883V4.04829H24.4223V7.1224Z"
              fill="white"
            />
          </svg>
        </div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <h1 id="title-notifications" className="py-0 my-0">
          Notifiche
        </h1>
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <TransitionGroup>
            {notificationsArray &&
              notificationsArray.map((element) => {
                return (
                  <CSSTransition
                    key={element.id}
                    classNames="transition"
                    timeout={500}
                  >
                    <Notification
                      element={element}
                      setNotifications={setNotifications}
                      notifications={notifications}
                    />
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}
