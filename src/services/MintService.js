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
const CANDY_MACHINE_CONFIG = {
  RPC_URL: "https://young-boldest-shape.solana-mainnet.quiknode.pro/483823d0b33897d7857f4ec67a0dba538b68377b/",
  CANDY_MACHINE_ADDRESS: "9g8ynnK5pU7ZaUaLCFQzTxphbjuq3ft7hevjjiUecpv7",
  AUTHORITY: "FtDmv1nGYogeHtGmQaLBfzQ279WKMn3FeBnbhagP1Xpz",
  COLLECTION_MINT: "8FgU28VXR9dArA3gaBp9ZWLTefpBktVLs9Hxz3qe7hum",
  VERSION: 1,
  USDT_MINT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
};


export async function mintFromCandyMachine(machineInfo, wallet) {
  if (!wallet?.publicKey) {
    throw new Error("Wallet not connected. Please connect your wallet first.");
  }

  try {
    console.log("Initializing UMI with RPC URL:", CANDY_MACHINE_CONFIG.RPC_URL);
    
    // Initialize UMI with the RPC URL and candy machine module
    const umi = createUmi(CANDY_MACHINE_CONFIG.RPC_URL).use(mplCandyMachine());
    
    console.log("Setting up wallet adapter...");
    const umiWalletAdapter = umi.use(walletAdapterIdentity(wallet));
    
    if (!umiWalletAdapter) {
      throw new Error("Failed to initialize wallet adapter");
    }

    // Get candy machine data
    console.log("Fetching candy machine data...");
    const candyMachinePublicKey = publicKey(machineInfo.publicKey || CANDY_MACHINE_CONFIG.CANDY_MACHINE_ADDRESS);
    console.log("Candy Machine Public Key:", candyMachinePublicKey.toString());
    
    const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
    if (!candyMachine) {
      throw new Error("Failed to fetch candy machine state. Please try again.");
    }
    console.log("Candy Machine fetched:", candyMachine);

    const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    if (!candyGuard) {
      throw new Error("No candy guard found. Set up a guard for your candy machine.");
    }
    console.log("Candy Guard fetched:", candyGuard);

    // Check if there are any NFTs left to mint
    if (candyMachine.itemsRemaining === 0) {
      throw new Error("All NFTs have been minted");
    }

    // Setup mint arguments based on enabled guards
    const { guards } = candyGuard;
    const enabledGuardsKeys = guards && Object.keys(guards).filter((guardKey) => guards[guardKey]);
    let mintArgs = {};

    // If there are enabled guards, set the mintArgs
    if (enabledGuardsKeys.length) {
      // Map enabled guards and set mintArgs automatically based on the fields defined in each guard
      enabledGuardsKeys.forEach((guardKey) => {
        const guardObject = unwrapOption(candyGuard.guards[guardKey]);
        if (!guardObject) return null;
        mintArgs = { ...mintArgs, [guardKey]: some(guardObject) };
      });
    }

    // Generate a new mint address
    console.log("Generating mint address...");
    const nftMint = generateSigner(umiWalletAdapter);
    if (!nftMint || !nftMint.publicKey) {
      throw new Error("Failed to generate NFT mint address");
    }
    console.log("NFT Mint address generated:", nftMint.publicKey.toString());

    // Build and send the transaction
    console.log("Building transaction...");
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

    console.log("Sending transaction...");
    const { result, signature } = await transaction.sendAndConfirm(umiWalletAdapter, {
      send: {
        commitment: "processed",
      },
    });

    if (!result) {
      throw new Error("Transaction failed: No result returned");
    }

    console.log("Transaction result:", result);
    console.log("Transaction signature:", signature);

    // Check for errors in the transaction result
    if (result.value?.err) {
      throw new Error(`Mint failed: ${result.value.err.toString()}`);
    }

    // Handle different signature formats
    let transactionSignature;
    if (typeof signature === 'string') {
      transactionSignature = signature;
    } else if (signature?.toString) {
      transactionSignature = signature.toString();
    } else if (result.signature?.toString) {
      transactionSignature = result.signature.toString();
    } else if (Array.isArray(signature)) {
      transactionSignature = Buffer.from(signature).toString('base64');
    } else {
      console.error("Unexpected signature format:", signature);
      transactionSignature = "signature-unavailable";
    }

    return {
      success: true,
      mint: nftMint.publicKey.toString(),
      signature: transactionSignature,
      metadata: null, // The metadata will need to be fetched separately if needed
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

    // If it's the toString error, provide more context
    if (error.message.includes("Cannot read properties of undefined")) {
      console.error("Detailed error state:", {
        wallet: wallet ? "present" : "missing",
        publicKey: wallet?.publicKey ? "present" : "missing",
        error: error
      });
      throw new Error("Failed to process transaction result. Please try again.");
    }

    throw new Error(error.message || "Failed to mint NFT. Please try again later.");
  }
}
