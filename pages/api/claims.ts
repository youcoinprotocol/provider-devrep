import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../helpers/prisma";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth";
import { parse } from "node-html-parser";
import moment from "moment";
import { ethers } from "ethers";

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

      if (
        !user ||
        user.isClaimed ||
        !user.commitment ||
        user.contributions < parseInt(process.env.MIN_CONTRIBUTIONS ?? "5")
      ) {
        throw new Error("Unauthorized");
      }

      const { sig, address } = req.body;
      const sigAddress = ethers
        .verifyMessage(`$YOU Github airdrop`, sig)
        .toLowerCase();
      if (sigAddress.toLowerCase() !== address.toLowerCase()) {
        throw new Error("Invalid signature");
      }

      await prisma.user.update({
        where: {
          id: session.user!.id,
        },
        data: {
          walletAddress: sigAddress,
          isClaimed: true,
        },
      });
      console.log(`${process.env.AIRDROP_API}`);
      console.log(` ${process.env.AIRDROP_API_TOKEN}`);
      console.log({
        data: {
          address: sigAddress,
          status: "PENDING",
          type: "DEVREP",
          amount: parseInt(process.env.AIRDROP_AMOUNT ?? "0"),
        },
      });

      const airdropRes = await fetch(`${process.env.AIRDROP_API}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRDROP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            address: sigAddress,
            status: "PENDING",
            type: "DEVREP",
            amount: parseInt(process.env.AIRDROP_AMOUNT ?? "0"),
          },
        }),
      });
      console.log(await airdropRes.json());
      success = true;

      res.status(200).json({ success });
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(400).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end();
  }
}
