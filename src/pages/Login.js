import React, { useState, useEffect } from "react";
import logo from "./logoWhite.svg";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

//npm install @mui/material @mui/styled-engine-sc styled-components @emotion/react @emotion/styled
//riga 91/92 cambiare il colore red con il colore del bottone in hover
//riga 44 se è il caso cambiate l'url del navigate
// oggetto in riga 28 (subscribeUsers) sono i dati per il login

function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("admin");
  const [wrogLogin, setWrongLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
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
    localStorage.getItem("authorized", "true") === "true" &&
      navigate("./dashboard");
    // eslint-disable-next-line
  }, []);

  const subscribedUsers = [
    {
      username: "admin",
      password: "admin",
    },
  ];

  const loginHandler = () => {
    if (
      subscribedUsers.some(
        (user, index, array) =>
          userName === user.username && array[index].password === password
      )
    ) {
      localStorage.setItem("authorized", "true");
      navigate("./dashboard");
    } else {
      setWrongLogin(true);
    }
  };

  const styleTextField = {
    width: "50%",
    textAlign: "center",
    color: "#1E293B",
    marginLeft: 100,
  };

  const styleWrongDiv = {
    width: "420px",
    minHeight: "35px",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    paddingTop: "10px",
    fontSize: "18px",
    fontWeight: "600",
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
    width: "180px",
    alignSelf: "center",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "red",
    },
  });

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#1E293B" }}>
      <div
        style={{ diplay: "flex", justifyContent: "center", paddingTop: "35px" }}
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
                  fontWeight: "600",
                },
              }}
              id="email"
              label="Email"
              variant="standard"
              style={styleTextField}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              floatingLabelText="Email"
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
