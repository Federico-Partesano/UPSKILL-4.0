import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { getUrlApi } from "../../endpoints";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { getStorageItem, setStorageItem } from "../../utils/localStorage";
import "./Profile.scss";
interface IProfile {
  gridDashboard: any;
  notifications: any;
}

export interface Payload {
  createdAt: string;
  email: string;
  name: string;
}

export interface RespUser {
  message: string;
  payload: Payload;
}

const Profile: FC<IProfile> = ({ gridDashboard, notifications }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<RespUser>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(getUrlApi("auth/me"), {
          headers: {
            Authorization: `Bearer ${getStorageItem("tokenJwt")}`,
          },
        });
        console.log("data", data);

        setUser(data);
      } catch (e) {
        console.log("e", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const exit = () => {
    setStorageItem("tokenJwt", "");
    navigate("/signin");
  };

  const renderTitle = () => {
    return <h1 id="title"> Profilo</h1>;
  };
  const renderImage = () => {
    return (
      <svg
        width="100"
        height="100"
        id="image"
        viewBox="0 0 167 167"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="83.5" cy="83.5" r="83.5" fill="#1E293B" />
        <path
          d="M83.5366 80.6728C96.1482 80.6728 106.372 70.449 106.372 57.8374C106.372 45.2257 96.1482 35.002 83.5366 35.002C70.9249 35.002 60.7012 45.2257 60.7012 57.8374C60.7012 70.449 70.9249 80.6728 83.5366 80.6728Z"
          fill="white"
        />
        <path
          d="M75.0869 87.5166H91.9167C101.177 87.5166 110.058 91.1953 116.606 97.7434C123.155 104.292 126.833 113.173 126.833 122.433V124.947H40.2402V122.433C40.2402 113.185 43.9093 104.314 50.4423 97.7681C56.9754 91.222 65.8386 87.5351 75.0869 87.5166V87.5166Z"
          fill="white"
        />
        <path
          d="M83.5367 145.897C117.978 145.897 145.898 117.977 145.898 83.5357C145.898 49.0947 117.978 21.1748 83.5367 21.1748C49.0957 21.1748 21.1758 49.0947 21.1758 83.5357C21.1758 117.977 49.0957 145.897 83.5367 145.897Z"
          stroke="white"
          stroke-miterlimit="10"
        />
      </svg>
    );
  };

  const renderLabel = (label: string, value: string) => {
    return (
      <div className="container__label">
        <p className="label">{label}</p>
        <p className="value">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        notifications={notifications}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          notifications={notifications}
          setSidebarOpen={setSidebarOpen}
        />
        {user && (
          <>
            {renderTitle()}
            {renderImage()}
            {renderLabel("name", user.payload.name)};
            {renderLabel("email", user.payload.email)};
            {renderLabel(
              "createdAt",
              new Date(user.payload.createdAt).toLocaleDateString("en-US")
            )}
       
        <div className="container__button">
          <div onClick={exit} className="button">
            Exit
          </div>
        </div>
        </>
        )}
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Profile;
