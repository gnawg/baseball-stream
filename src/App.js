import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Paper,
  Card,
  Button,
  Fab,
  Switch,
} from "@mui/material";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { parseHash } from "./util";

const redirectURI = process.env.REDIRECT_URI || "http://localhost:3000/auth";
const clientID = "1jm2ajf9hva6pa6pz16zacwe8fa0ez";
const scopes =
  "channel:read:redemptions channel:manage:redemptions channel:read:subscriptions";

const AccessTokenContext = React.createContext("");
const DevModeContext = React.createContext(false);

const AuthPage = (props) => {
  const { setAccessToken } = props;
  const loc = useLocation();
  useEffect(() => {
    const hash = parseHash(loc.hash).access_token;
    setAccessToken(hash);
  });

  return <></>;
};

const mockAuth = async (accessToken) => {
  const foo = await axios.get(`${mockRoot}/units/clients`);
  /* const foo = await axios.get(`${apiRoot}/users`, {
    headers: { "Client-Id": clientID, Authorization: `Bearer ${accessToken}` },
  }); */

  console.log(foo);

  // await axios.post(`${mockRoot}/auth/authorize`);
};

const getCurrentUser = async () => {
  await axios;
};

const mockRoot = "http://localhost:8080";
const apiRoot = `https://api.twitch.tv/helix`;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [devMode, setDevMode] = useState(false);
  const navigate = useNavigate();

  const authLink = `https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scopes}`;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {accessToken ? (
            <>
              <Fab
                onClick={() => {
                  navigate("/logout");
                  setAccessToken("");
                }}
              >
                Log out
              </Fab>
            </>
          ) : (
            <Fab href={authLink}>login</Fab>
          )}
          <Link to="/">Home</Link>
        </Toolbar>
      </AppBar>
      <main>
        <Button onClick={() => mockAuth(accessToken)}>Click Here </Button>
        <Switch checked={devMode} onClick={() => setDevMode(!devMode)} />
        Targeting {devMode ? mockRoot : "twitch api"}
        {accessToken ? (
          <div>your access token is {accessToken}</div>
        ) : (
          <div>Log in via twitch to get started</div>
        )}
        <Routes>
          <Route
            path="auth"
            element={<AuthPage setAccessToken={setAccessToken} />}
          />
          <Route
            path="/"
            element={
              <div>
                <div>Available redemptions:</div>
                <button>Create new redemption</button>
                <div></div>
              </div>
            }
          />
          <Route path="new-redemption" element={<div>Create Redemption</div>} />
          <Route path="redemption" element={<div>redemption</div>} />
          <Route path="preview-output" element={<div>preview</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
