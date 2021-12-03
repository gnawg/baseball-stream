import axios from "axios";

export const twitchRoot = `https://api.twitch.tv/helix`;
// export const twitchRoot = `http://localhost:8080`;

export const getUser = async (accessToken, clientID) => {
  const data = await axios.get(`${twitchRoot}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientID,
    },
  });
  console.log(data);
};

export const getSubs = async (broadcasterID) => {
  const newSubs = await axios.get(
    `${twitchRoot}/subscriptions/?broadcaster_id=${broadcasterID}`
  );
  //setSubs([...subs, ...newSubs]);
};

export const parseHash = (str = "") => {
  str = str[0] === "#" ? str.substring(1) : str;

  const obj = str.split("&").reduce((prev, curr) => {
    const entry = curr.split("=");
    return {
      ...prev,
      [entry[0]]: entry[1],
    };
  }, {});

  return obj;
};
