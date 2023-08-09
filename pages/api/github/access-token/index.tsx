import { setItem } from "@/utils/localStorageHelper";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
    const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "";
    const url = "https://github.com/login/oauth/access_token";
    const code = req.body.code;

    try {
      const response = await axios.post(
        url,
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      /* res.redirect('http://myjsapp/' + response.data); */

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
