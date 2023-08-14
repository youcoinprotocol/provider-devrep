
Upon approval of the application, you will be given:

-   providerId
-   Your wallet address will be set as admin of the reputation group on chain

There will be two integration points for the app:

1.  Create identity for user
2.  Add user to the trait groups

## Create Identity for User

### Prerequisite

1.  User account must be unique. Provider is responsible to ensure one account can only link with 1 unique commitment.

### Process

1.  Once user has authorized and verified, redirect user to YOUID app (eg: https://id.youcoin.org/link?reputationId=1000&pwd=USER_ID&callback=http://localhost:3000/link) to create zkp proof.
2. Upon returning to /link page, call /api/links API to verify the zkp proof using nullifierHash and commitment
    
    ```jsx
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
    
    ```
    

### Output

Once you have verified the proof, you may record the commitment as YOUID for the associated user. Provider is responsible to keep this relationship as it is required to be used to update the reputation data tagged to users.

## Add User to the Groups

### Prerequisite

1.  A verified reputation provider account
2. Create trait groups on chain, using your wallet when registering your reputation provider account https://basescan.org/address/0x5a8eCdCb63F1aA56d4652168fD632Bf0b6e0Fab4#writeContract

### Process

1.  Once the groups that users belong to have been identified, call /api/contributions API to add users to the group. To do this, you will need to interact with YOU Registry (Smart Contract).
    
2.  You will need the ABI of the Smart Contract.
    
3.  Add member in the trait group
    
    ```jsx
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
      console.log("Added to group #", tx.hash);
    };
    
    ```
    

### Output

User should be able to view their traits on YOUID app.