import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../helpers/prisma";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth";
import { parse } from "node-html-parser";
import moment from "moment";
import { ethers } from "ethers";

const ABI = [
  {
    inputs: [
      {
        internalType: "contract ISemaphoreVerifier",
        name: "_verifier",
        type: "address",
      },
      { internalType: "address", name: "_registryAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "NotRegistry", type: "error" },
  { inputs: [], name: "Semaphore__CallerIsNotTheGroupAdmin", type: "error" },
  { inputs: [], name: "Semaphore__GroupAlreadyExists", type: "error" },
  { inputs: [], name: "Semaphore__GroupDoesNotExist", type: "error" },
  {
    inputs: [],
    name: "Semaphore__MerkleTreeDepthIsNotSupported",
    type: "error",
  },
  { inputs: [], name: "Semaphore__MerkleTreeRootIsExpired", type: "error" },
  {
    inputs: [],
    name: "Semaphore__MerkleTreeRootIsNotPartOfTheGroup",
    type: "error",
  },
  {
    inputs: [],
    name: "Semaphore__YouAreUsingTheSameNillifierTwice",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "GroupAdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeDepth",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "zeroValue",
        type: "uint256",
      },
    ],
    name: "GroupCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMerkleTreeDuration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMerkleTreeDuration",
        type: "uint256",
      },
    ],
    name: "GroupMerkleTreeDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256",
      },
    ],
    name: "MemberAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newIdentityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256",
      },
    ],
    name: "MemberUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "merkleTreeRoot",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "externalNullifier",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "signal",
        type: "uint256",
      },
    ],
    name: "ProofVerified",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      {
        internalType: "uint256[]",
        name: "identityCommitments",
        type: "uint256[]",
      },
    ],
    name: "addMembers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "merkleTreeDepth", type: "uint256" },
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "uint256", name: "merkleTreeDuration", type: "uint256" },
    ],
    name: "createGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "merkleTreeDepth", type: "uint256" },
      { internalType: "address", name: "admin", type: "address" },
    ],
    name: "createGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getMerkleTreeDepth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getMerkleTreeRoot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getNumberOfMerkleTreeLeaves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "groups",
    outputs: [
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "uint256", name: "merkleTreeDuration", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
      { internalType: "uint256[]", name: "proofSiblings", type: "uint256[]" },
      { internalType: "uint8[]", name: "proofPathIndices", type: "uint8[]" },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "address", name: "newAdmin", type: "address" },
    ],
    name: "updateGroupAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      {
        internalType: "uint256",
        name: "newMerkleTreeDuration",
        type: "uint256",
      },
    ],
    name: "updateGroupMerkleTreeDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
      {
        internalType: "uint256",
        name: "newIdentityCommitment",
        type: "uint256",
      },
      { internalType: "uint256[]", name: "proofSiblings", type: "uint256[]" },
      { internalType: "uint8[]", name: "proofPathIndices", type: "uint8[]" },
    ],
    name: "updateMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_registryAddress", type: "address" },
    ],
    name: "updateRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifier",
    outputs: [
      {
        internalType: "contract ISemaphoreVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "merkleTreeRoot", type: "uint256" },
      { internalType: "uint256", name: "signal", type: "uint256" },
      { internalType: "uint256", name: "nullifierHash", type: "uint256" },
      { internalType: "uint256", name: "externalNullifier", type: "uint256" },
      { internalType: "uint256[8]", name: "proof", type: "uint256[8]" },
    ],
    name: "verifyProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const addMemberToGroup = async (commitment: string) => {
  if (!commitment.length) {
    return;
  }
  const provider = new ethers.JsonRpcProvider(process.env.JSONRPC);
  const wallet = new ethers.Wallet(
    process.env.WALLET_PRIVATEKEY ?? "",
    provider
  );

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDR ?? "",
    ABI,
    wallet
  );
  const tx = await contract.addMember(process.env.GROUP_ID, commitment);
};

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
        addMemberToGroup(session.user!.commitment ?? "");
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
