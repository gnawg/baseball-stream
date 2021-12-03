import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./App.css";
import { AppBar, Toolbar, Paper, Card, Fab } from "@mui/material";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { parseHash } from "./util";

const redirectURI = process.env.REDIRECT_URI || "http://localhost:3000/auth";
const clientID = "1jm2ajf9hva6pa6pz16zacwe8fa0ez";
const scopes =
  "channel:read:redemptions channel:manage:redemptions channel:read:subscriptions";

const AccessTokenContext = React.createContext("");

const AuthPage = (props) => {
  const { setAccessToken } = props;
  const loc = useLocation();
  useEffect(() => {
    const hash = parseHash(loc.hash).access_token;
    setAccessToken(hash);
  });

  return <></>;
};

// const [accessToken, setAccessToken] = useState("");

/* const loc = useLocation();
const accessToken = parseHash(loc.hash).access_token;

useEffect(() => {
  console.log(parseHash(loc.hash).access_token);
  setAccessToken(parseHash(loc.hash).access_token);
}, []); */

function App() {
  const [accessToken, setAccessToken] = useState("");
  const loc = useLocation();
  const navigate = useNavigate();

  const authLink = `https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scopes}`;

  return (
    <>
      <AccessTokenContext.Provider value={accessToken}>
        <AppBar position="sticky">
          <Toolbar>
            {accessToken ? (
              <>
                <div>`your access token is ${accessToken}`</div>
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
            <Link to="foo">Foo</Link>
            <Link to="bar">Bar</Link>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route
            path="auth"
            element={<AuthPage setAccessToken={setAccessToken} />}
          />
          <Route path="foo" element={<div>"foo"</div>} />
          <Route path="bar" element={<div>"bar"</div>} />
        </Routes>
      </AccessTokenContext.Provider>
    </>
  );
}

export default App;
