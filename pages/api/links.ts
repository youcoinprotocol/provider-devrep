import { NextApiRequest, NextApiResponse } from "next";
import { verifyProof } from "@semaphore-protocol/proof";
import { Group } from "@semaphore-protocol/group";
import { ethers } from "ethers";
import {getSession} from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    const session = await getSession({ req })
    if(!session){
      //TODO
    }
    console.log(session,"@@hihi")
  }
  if (req.method === "POST") {
    try {
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

      const verificationRes = await verifyProof(myProof, 20);
      // TODO: Store commitment in db
      res.status(200).json({ success: verificationRes });
    } catch (error: any) {
      console.error("Error", error.message);
      res.status(400).json({ error: "An error occurred" });
    }
  } else {
    res.status(405).end();
  }
}
