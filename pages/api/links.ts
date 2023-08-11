import { NextApiRequest, NextApiResponse } from "next";
import { verifyProof } from "@semaphore-protocol/proof";
import { Group } from "@semaphore-protocol/group";
import { ethers } from "ethers";
import { prisma } from "../../helpers/prisma";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = (await getServerSession(req, res, options)) as Session;
      if (!session) {
        throw new Error("Unauthorized");
      }

      // Verify proofs
      const { commitment, proof, nullifierHash, pwd } = req.body;
      const group = new Group(1);
      group.addMember(`${commitment}`);
      const root = group.merkleTree.root;
      const externalNullifier = ethers.encodeBytes32String(pwd);
      const signal = ethers.encodeBytes32String(pwd);

      const myProof = {
        merkleTreeRoot: root,
        nullifierHash: nullifierHash ?? "",
        signal,
        externalNullifier,
        proof,
      };

      const user = await prisma.user.findUnique({
        where: {
          commitment: commitment,
        },
      });

      if (user) {
        res.status(403).json({ error: "Duplicated key" });
      }

      const verificationRes = await verifyProof(myProof, 20);
      ////

      if (verificationRes) {
        await prisma.user.update({
          where: {
            id: session.user!.id,
          },
          data: {
            commitment,
          },
        });
      }

      res.status(200).json({ success: verificationRes });
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(400).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end();
  }
}
