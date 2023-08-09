import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../helpers/prisma";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth";
import { parse } from "node-html-parser";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let success = false;
      const session = (await getServerSession(req, res, options)) as Session;
      if (!session) {
        throw new Error("Unauthorized");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: session.user!.id,
        },
        include: {
          accounts: true,
        },
      });
      if (!user || !user.accounts.length) {
        throw new Error("Unauthorized");
      }

      const account = user.accounts[0];

      // Get github user
      const userResponse = await fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });
      const snapshotDate = moment("2023-08-01");
      const githubUser = await userResponse.json();
      const githubUserPage = await fetch(
        `https://github.com/users/${githubUser.login}/contributions`
      );
      let contributions = 0;

      if (githubUserPage) {
        const body = await githubUserPage.text();
        const doc = parse(body);
        const nodes = doc
          .querySelectorAll(".ContributionCalendar-day")
          .filter(
            (node) =>
              parseInt(node.getAttribute("data-level") ?? "0") > 0 &&
              node.getAttribute("data-date") &&
              moment(node.getAttribute("data-date")).diff(snapshotDate) < 0
          );

        contributions = nodes.length;
      }

      if (contributions >= parseInt(process.env.MIN_CONTRIBUTIONS ?? "5")) {
        success = true;
        await prisma.user.update({
          where: {
            id: session.user!.id,
          },
          data: {
            contributions,
          },
        });
      }

      res.status(200).json({ success });
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(400).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end();
  }
}
