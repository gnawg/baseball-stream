import axios from "axios";
import { useState } from "react";
import "./App.css";

const redirectURI = process.env.REDIRECT_URI || "http://localhost:3000";
const clientID = "1jm2ajf9hva6pa6pz16zacwe8fa0ez";
const scopes = "channel:read:redemptions channel:read:subscriptions";
const twitchRoot = `https://api.twitch.tv/helix`;

function App() {
  const [subs, setSubs] = useState([]);
  const [broadcasterID, setBroadcasterID] = "";

  const getUser = async () => {
    const data = await axios.get(`${twitchRoot}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientID,
      },
    });
    console.log(data);
  };

  const getSubs = async () => {
    const newSubs = await axios.get(
      `${twitchRoot}/subscriptions/?broadcaster_id=${broadcasterID}`
    );
    setSubs([...subs, ...newSubs]);
  };

  const hash = document.location.hash
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const entry = curr.split("=");
      return {
        ...prev,
        [entry[0]]: entry[1],
      };
    }, {});

  console.log(hash);
  const accessToken = hash["access_token"];

  const me = accessToken ? getUser() : "";
  console.log(me);

  return (
    <body>
      {accessToken ? (
        `${JSON.stringify(me)}`
      ) : (
        <a
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scopes}`}
        >
          login
        </a>
      )}
    </body>
  );
}

export default App;
