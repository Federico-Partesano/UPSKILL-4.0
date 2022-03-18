import React, { useState, useEffect, CSSProperties } from "react";
import logo from "./../images/logoWhite.svg";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLogin from "../hooks/useLogin";
// import { CSSProperties } from "@mui/styled-engine";

//npm install @mui/material @mui/styled-engine-sc styled-components @emotion/react @emotion/styled
//riga 91/92 cambiare il colore red con il colore del bottone in hover
//riga 44 se è il caso cambiate l'url del navigate
// oggetto in riga 28 (subscribeUsers) sono i dati per il login

function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [wrogLogin, setWrongLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [fetchRegistration, isLoading] = useLogin();
  const focusHandlerEmail = () => {
    setFocusEmail(true);
    focusPass && setFocusPass(false);
  };
  const focusHandlerPass = () => {
    setFocusPass(true);
    focusEmail && setFocusEmail(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("authorized") === "true" && navigate("./dashboard");
    // eslint-disable-next-line
  }, []);

  const subscribedUsers = [
    {
      username: "admin",
      password: "admin",
    },
  ];

  const loginHandler = async () => {
    // if (
    //   subscribedUsers.some(
    //     (user, index, array) =>
    //       userName === user.username && array[index].password === password
    //   )
    // ) {
    try {
      const resp = await fetchRegistration({
        method: "POST",
        data: {
          name: userName,
          password,
          email: "provola@gmail.com",
          createdAt: new Date(),
        },
      });
      console.log("prova", resp);

      localStorage.setItem("authorized", "true");
      navigate("./dashboard");
    } catch (e) {
      console.log("e", e);
    }
    // } else {
    //   setWrongLogin(true);
    // }
  };

  const styleTextField: CSSProperties = {
    width: "50%",
    textAlign: "center",
    color: "#1E293B",
    marginLeft: 100,
  };

  const styleWrongDiv: CSSProperties = {
    width: "420px",
    minHeight: "35px",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    paddingTop: "10px",
    fontSize: 18,
    fontWeight: 600,
  };

  const PersonalInput = styled(TextField)({
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1E293B",
    },
    "& label": {
      color: "#1E293B",
      fontSize: "1.2rem",
      fontWeight: "600",
      width: "100%",
      textAlign: "center",
      transformOrigin: "center",
    },
    "& label.Mui-focused": {
      color: "#1E293B",
    },
  });

  const PersonalButton = styled(Button)({
    backgroundColor: "#1E293B",
    width: 180,
    alignSelf: "center",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "red",
    },
  });

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#1E293B" }}>
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 35 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} height="100" width="80" alt="logo" />
          <div
            style={{
              width: "420px",
              height: "320px",
              backgroundColor: "white",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <PersonalInput
              value={userName}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                },
              }}
              id="email"
              label="Name"
              variant="standard"
              style={styleTextField}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              autoFocus={focusEmail}
              onClick={focusHandlerEmail}
              // onMouseOver={focusHandlerEmail}
            />

            <PersonalInput
              value={password}
              inputProps={{
                style: { textAlign: "center", fontSize: "1.2rem" },
              }}
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              style={styleTextField}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus={focusPass}
              onClick={focusHandlerPass}
              // onMouseOver={focusHandlerPass}
            />

            <PersonalButton variant="contained" onClick={() => loginHandler()}>
              Login
            </PersonalButton>
          </div>
          {wrogLogin && (
            <div style={styleWrongDiv}>Wrong email or password</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
