import { redirect } from "next/navigation";

const axios = require("axios");

export async function redirectToGithub() {
  //const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=https://dc4e-210-19-170-202.ngrok-free.app/`;
  //window.location.href = authUrl;
}

export async function getGitHubAccessToken(code: string) {
  const url = "/api/github/access-token";

  const params = new URLSearchParams();
  params.append("code", code);

  try {
    const response = await axios.post(url, params, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting GitHub access token:", error);
    throw error;
  }
}

export async function getGithubUser(accessToken: string) {
  const url = "/api/github/user";

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting GitHub access token:", error);
    throw error;
  }
}

export async function getGithubEventByUsername(
  accessToken: string,
  username: string
) {
  const url = "/api/github/event/" + username;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting GitHub access token:", error);
    throw error;
  }
}
