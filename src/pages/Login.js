import React, { useState, useEffect } from "react";
import Background1 from "../images/upskill-21.svg";
import Background2 from "../images/upskill-22.svg";
import { Grid, Box, Button, useMediaQuery, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isSmall = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const subscribedUsers = [
    {
      username: "andrea",
      password: "sonoAndrea",
    },
    {
      username: "federico",
      password: "sonoFederico"
    },
    {
      username: "matteo",
      password: "sonoMatteo"
    }
  ]

  const checkCredentials = () => {
    const foundByUsername = subscribedUsers.find(user => user.username === username);
    switch (true) {
      case !username || !password:
        setError(`Entrambi i campi username e password devono essere riempiti`);
        return
      case !foundByUsername:
        setError(`Nessun utente è stato trovato con lo username inserito ${username}`);
        return
      case foundByUsername.password !== password:
        setError(`Un utente con lo username ${username} è stato trovato ma la password inserita non corrisponde`)
        return
      default:
        localStorage.setItem("authorized", "true");
        navigate("./dashboard");
    }
  }

  useEffect(() => {
    localStorage.getItem("authorized") === "true" && navigate("./dashboard", { replace: true });
    //const forbiddenScreen = localStorage.getItem("notAuthorized");
    //forbiddenScreen && setError(`Prima di poter accedere alla schermata ${forbiddenScreen} devi effettuare il login`);
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#ff0000",
          paddingTop: 20,
          paddingBottom: 20,
          /*borderBottomWidth: 2,
          borderBottomColor: "#ff0000",
          backgroundColor: "#F20A0A",
          position: "absolute",
          top: 0,
          width: "100%",*/
        }}>{error && error}</div>

      <Grid container style={{ height: "100vh" }}>
        <Grid style={{ position: "relative" }} item xs={12} md={4} ><img
          style={isSmall ? { width: "40%" } : isMedium ? { width: "25vw" } : { width: "50%" }} src={Background1} /></Grid>
        <Grid item xs={12} md={4}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
            <h1 style={{ textAlign: "center", fontSize: "3.5rem" }}>LOGIN</h1>
            <div style={{ display: "flex", flexDirection: "column", background: "linear-gradient(to left,#2FC6B4,#257883,#277681,#1A1F3D)", width: "100%", height: "400px", borderRadius: "13%", justifyContent: "center", color: "#fff" }}>
              <Box component="form" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20%" }}>
                <h2>Username</h2>
                <TextField sx={{ background: "white", borderRadius: "40px" }} id="email" variant="outlined" onChange={(e) => { setUsername(e.target.value) }} />
                <h2>Password</h2>
                <TextField type='password' sx={{ background: "white", borderRadius: "40px" }} id="password" variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
                <Button style={{ color: "white", borderRadius: "10px", background: "linear-gradient(to left,#2FC6B4,#257883,#277681,#1A1F3D)", border: "1px solid white", margin: "40px auto 0", width: "50%" }} variant="outlined" size="large" onClick={checkCredentials} >Submit</Button>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid style={{ position: "relative" }}
          item xs={12} md={4}><img
            style={isSmall ? { width: "40%", marginLeft: "60%", marginTop: '10vh' } :
              isMedium ? { width: "35vw", marginLeft: "63vw", marginTop: '15vh' } :
                { width: "60%", marginTop: '60vh', marginLeft: "40%" }} src={Background2} />
        </Grid>
      </Grid>
    </>
  )
}

export default Login;
