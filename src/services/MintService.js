import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

const CANDY_MACHINE_CONFIG = {
  RPC_URL: "https://young-boldest-shape.solana-mainnet.quiknode.pro/483823d0b33897d7857f4ec67a0dba538b68377b/",
  CANDY_MACHINE_ADDRESS: "5MYS3ZS4aUUM61qmLHqY5k6LY6gmkt429K9JAPA7Gmv5",
  AUTHORITY: "FtDmv1nGYogeHtGmQaLBfzQ279WKMn3FeBnbhagP1Xpz",
  COLLECTION_MINT: "AMT8NTPppueqZcpjw4VGKdjSL7phUx3GYkY1v7m3FgCo",
  VERSION: 1
};

export async function mintFromCandyMachine(machineInfo, wallet) {
  if (!wallet?.publicKey) {
    throw new Error("Wallet not connected. Please connect your wallet first.");
  }

  try {
    // Create connection with commitment: 'confirmed' for better reliability
    const connection = new Connection(CANDY_MACHINE_CONFIG.RPC_URL, 'confirmed');

    // Verify connection
    const slot = await connection.getSlot().catch(() => null);
    if (!slot) {
      throw new Error("Failed to connect to Solana network. Please try again.");
    }

    const metaplex = new Metaplex(connection).use(
      walletAdapterIdentity(wallet)
    );

    const candyMachine = {
      address: new PublicKey(machineInfo.publicKey || CANDY_MACHINE_CONFIG.CANDY_MACHINE_ADDRESS),
      authorityAddress: new PublicKey(machineInfo.authority || CANDY_MACHINE_CONFIG.AUTHORITY),
      collectionMintAddress: new PublicKey(machineInfo.collectionMint || CANDY_MACHINE_CONFIG.COLLECTION_MINT),
      version: machineInfo.version || CANDY_MACHINE_CONFIG.VERSION,
    };

    // Verify candy machine state before minting
    const candyMachineState = await metaplex.candyMachines().findByAddress({
      address: candyMachine.address
    }).catch((err) => {
      console.error("Failed to fetch candy machine state:", err);
      return null;
    });

    if (!candyMachineState) {
      throw new Error("Failed to fetch candy machine state. Please try again.");
    }

    if (candyMachineState.itemsRemaining === 0) {
      throw new Error("All NFTs have been minted");
    }

    // Check wallet balance
    const balance = await connection.getBalance(wallet.publicKey);
    const mintPrice = candyMachineState.candyGuard?.guards?.solPayment?.amount?.basisPoints?.toNumber() || 0;
    
    if (balance < mintPrice) {
      const solPrice = mintPrice / 1000000000; // Convert lamports to SOL
      throw new Error(`Insufficient SOL balance. You need ${solPrice} SOL to mint.`);
    }

    const { nft, response } = await metaplex.candyMachines().mint({
      candyMachine: candyMachineState,
      collectionUpdateAuthority: candyMachine.authorityAddress,
      group: machineInfo.group, // Add group if specified
    });

    if (!nft || !response) {
      throw new Error("Minting failed. Please try again.");
    }

    return {
      success: true,
      mint: nft.address.toString(),
      signature: response.signature,
      metadata: nft.json,
    };
  } catch (error) {
    console.error("Minting error:", error);
    
    // Handle specific error cases
    if (error.message.includes("insufficient funds")) {
      throw new Error("Insufficient funds to complete the mint");
    } else if (error.message.includes("not live")) {
      throw new Error("Minting is not live yet");
    } else if (error.message.includes("wallet not connected")) {
      throw new Error("Please connect your wallet to mint");
    } else if (error.message.includes("Invalid address")) {
      throw new Error("Invalid Candy Machine address");
    } else if (error.name === "WalletSignTransactionError") {
      throw new Error("Transaction was not confirmed. Please try again.");
    } else if (error.message.includes("could not find guard")) {
      throw new Error("Minting is not currently available");
    }

    throw new Error(error.message || "Failed to mint NFT. Please try again later.");
  }
}
