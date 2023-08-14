import { NextApiRequest, NextApiResponse } from "next";
import { Proof, verifyProof } from "@semaphore-protocol/proof";
import { Group } from "@semaphore-protocol/group";
import { ethers } from "ethers";
import { prisma } from "../../helpers/prisma";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session, User } from "next-auth";

async function preventDuplicatedCommitment(commitment: string) {
  const user = await prisma.user.findUnique({
    where: {
      commitment,
    },
  });
  if (user) {
    throw new Error("Duplicated commitment");
  }
  return true;
}

async function preventDuplicatedLink(user: User | undefined) {
  if (user?.commitment) {
    throw new Error("Duplicated Github account");
  }
  return true;
}

async function verifyProofs(
  commitment: string,
  pwd: string,
  nullifierHash: string,
  proof: Proof
) {
  // Verify proofs
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
  const res = await verifyProof(myProof, 20);
  if (!res) {
    throw new Error("Invalid proof");
  }
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = (await getServerSession(req, res, options)) as Session;
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const { commitment, proof, nullifierHash, pwd } = req.body;

      await preventDuplicatedCommitment(commitment);
      await preventDuplicatedLink(session.user);
      await verifyProofs(commitment, pwd, nullifierHash, proof);

      await prisma.user.update({
        where: {
          id: session.user!.id,
        },
        data: {
          commitment,
        },
      });

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
