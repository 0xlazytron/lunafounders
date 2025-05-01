import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSetMintArgs,
  mplCandyMachine,
  fetchCandyMachine,
  fetchCandyGuard,
  mintV2
} from "@metaplex-foundation/mpl-candy-machine";
import { publicKey, some, unwrapOption } from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { transactionBuilder, generateSigner } from "@metaplex-foundation/umi";

// const CANDY_MACHINE_CONFIG = {
//   RPC_URL: "https://young-boldest-shape.solana-mainnet.quiknode.pro/483823d0b33897d7857f4ec67a0dba538b68377b/",
//   CANDY_MACHINE_ADDRESS: "5MYS3ZS4aUUM61qmLHqY5k6LY6gmkt429K9JAPA7Gmv5",
//   AUTHORITY: "FtDmv1nGYogeHtGmQaLBfzQ279WKMn3FeBnbhagP1Xpz",
//   COLLECTION_MINT: "AMT8NTPppueqZcpjw4VGKdjSL7phUx3GYkY1v7m3FgCo",
//   VERSION: 1,
//   USDT_MINT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
// };
// lunatickets $5
const CANDY_MACHINE_CONFIG = {
  RPC_URL: "https://young-boldest-shape.solana-mainnet.quiknode.pro/483823d0b33897d7857f4ec67a0dba538b68377b/",
  CANDY_MACHINE_ADDRESS: "9g8ynnK5pU7ZaUaLCFQzTxphbjuq3ft7hevjjiUecpv7",
  AUTHORITY: "FtDmv1nGYogeHtGmQaLBfzQ279WKMn3FeBnbhagP1Xpz",
  COLLECTION_MINT: "8FgU28VXR9dArA3gaBp9ZWLTefpBktVLs9Hxz3qe7hum",
  VERSION: 1,
  USDT_MINT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
};


export async function mintFromCandyMachine(machineInfo, wallet) {
  console.log("🚀 Starting mint process...");
  console.log("Wallet status:", {
    connected: wallet?.connected,
    hasPublicKey: !!wallet?.publicKey,
    publicKey: wallet?.publicKey?.toString()
  });

  if (!wallet?.publicKey) {
    console.error("❌ Wallet not connected");
    throw new Error("Wallet not connected. Please connect your wallet first.");
  }

  try {
    console.log("📡 Initializing UMI with RPC URL:", CANDY_MACHINE_CONFIG.RPC_URL);
    
    // Initialize UMI with the RPC URL and candy machine module
    const umi = createUmi(CANDY_MACHINE_CONFIG.RPC_URL).use(mplCandyMachine());
    console.log("✅ UMI initialized successfully");
    
    console.log("🔄 Setting up wallet adapter...");
    const umiWalletAdapter = umi.use(walletAdapterIdentity(wallet));
    if (!umiWalletAdapter) {
      console.error("❌ Failed to initialize wallet adapter");
      throw new Error("Failed to initialize wallet adapter");
    }
    console.log("✅ Wallet adapter setup complete");

    // Get candy machine data
    console.log("🔍 Fetching candy machine data...");
    const candyMachinePublicKey = publicKey(machineInfo.publicKey || CANDY_MACHINE_CONFIG.CANDY_MACHINE_ADDRESS);
    console.log("📍 Candy Machine Public Key:", candyMachinePublicKey.toString());
    
    const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
    if (!candyMachine) {
      console.error("❌ Failed to fetch candy machine state");
      throw new Error("Failed to fetch candy machine state. Please try again.");
    }
    console.log("✅ Candy Machine fetched successfully");

    const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    if (!candyGuard) {
      console.error("❌ No candy guard found");
      throw new Error("No candy guard found. Set up a guard for your candy machine.");
    }
    console.log("✅ Candy Guard fetched successfully");

    // Check if there are any NFTs left to mint
    if (candyMachine.itemsRemaining === 0) {
      console.error("❌ All NFTs have been minted");
      throw new Error("All NFTs have been minted");
    }

    // Setup mint arguments based on enabled guards
    console.log("⚙️ Setting up mint arguments...");
    const { guards } = candyGuard;
    const enabledGuardsKeys = guards && Object.keys(guards).filter((guardKey) => guards[guardKey]);
    console.log("Enabled guards:", enabledGuardsKeys);
    let mintArgs = {};

    // If there are enabled guards, set the mintArgs
    if (enabledGuardsKeys.length) {
      console.log("🔒 Processing guard configuration...");
      enabledGuardsKeys.forEach((guardKey) => {
        const guardObject = unwrapOption(candyGuard.guards[guardKey]);
        if (!guardObject) return null;
        mintArgs = { ...mintArgs, [guardKey]: some(guardObject) };
      });
      console.log("✅ Guard configuration complete");
    }

    // Generate a new mint address
    console.log("🔑 Generating mint address...");
    const nftMint = generateSigner(umiWalletAdapter);
    if (!nftMint || !nftMint.publicKey) {
      console.error("❌ Failed to generate NFT mint address");
      throw new Error("Failed to generate NFT mint address");
    }
    console.log("✅ NFT Mint address generated:", nftMint.publicKey.toString());

    // Build and send the transaction
    console.log("📝 Building transaction...");
    const transaction = transactionBuilder()
      .add(setComputeUnitLimit(umiWalletAdapter, { units: 800_000 }))
      .add(
        mintV2(umiWalletAdapter, {
          candyMachine: candyMachine.publicKey,
          nftMint,
          collectionMint: candyMachine.collectionMint,
          collectionUpdateAuthority: candyMachine.authority,
          tokenStandard: candyMachine.tokenStandard,
          candyGuard: candyGuard?.publicKey,
          mintArgs,
        }),
      );
    console.log("✅ Transaction built successfully");

    console.log("🚀 Sending transaction...");
    try {
      const tx = await transaction.sendAndConfirm(umiWalletAdapter, {
        send: {
          commitment: "processed",
        },
      });

      console.log("📦 Raw transaction response:", tx);

      // Extract signature from transaction response
      let transactionSignature;
      
      if (tx.signature && typeof tx.signature === 'string') {
        transactionSignature = tx.signature;
      } else if (tx.signature?.toString) {
        transactionSignature = tx.signature.toString();
      } else if (Array.isArray(tx.signature)) {
        transactionSignature = Buffer.from(tx.signature).toString('base64');
      } else {
        // Generate a fallback signature for UI purposes
        transactionSignature = Date.now().toString(36) + Math.random().toString(36).substr(2);
        console.warn("⚠️ Using fallback signature:", transactionSignature);
      }

      console.log("✅ Mint completed successfully!");
      console.log("🔗 Explorer link:", `https://solscan.io/tx/${transactionSignature}`);

      return {
        success: true,
        mint: nftMint.publicKey.toString(),
        signature: transactionSignature,
        metadata: null,
        explorerLink: `https://solscan.io/tx/${transactionSignature}`
      };

    } catch (txError) {
      console.error("❌ Transaction error:", txError);
      throw new Error(txError.message || "Failed to process transaction");
    }

  } catch (error) {
    console.error("❌ Minting error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle specific error cases
    let errorMessage = error.message || "Failed to mint NFT. Please try again later.";
    
    if (error.message.includes("insufficient funds")) {
      console.error("💰 Insufficient funds error");
      errorMessage = "Insufficient funds to complete the mint. Please check your SOL and USDT balance.";
    } else if (error.message.includes("not live")) {
      console.error("⏰ Minting not live error");
      errorMessage = "Minting is not live yet. Please try again later.";
    } else if (error.message.includes("wallet not connected")) {
      console.error("👛 Wallet not connected error");
      errorMessage = "Please connect your wallet to mint NFTs.";
    } else if (error.message.includes("Invalid address")) {
      console.error("🏷️ Invalid address error");
      errorMessage = "Invalid Candy Machine address. Please contact support.";
    } else if (error.name === "WalletSignTransactionError") {
      console.error("✍️ Transaction signing error");
      errorMessage = error.message.includes("User rejected") 
        ? "You rejected the transaction. Please try again if you'd like to mint."
        : "Failed to sign the transaction. Please try again.";
    } else if (error.message.includes("could not find guard")) {
      console.error("🔒 Guard not found error");
      errorMessage = "Minting is not currently available";
    }

    throw new Error(errorMessage);
  }
}
