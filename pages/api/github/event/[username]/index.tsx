import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const authorizationHeader = req.headers.authorization;

      if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const username = req.query.username; // Replace with your GitHub access token
        const accessToken = authorizationHeader.substr(7); // Remove "Bearer " from the header
        const response = await axios.get(
          "https://api.github.com/users/" + username + "/events/public",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userData = response.data;
        res.status(200).json(userData);
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
