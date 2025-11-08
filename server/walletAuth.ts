import { Request, Response, NextFunction } from "express";
import { PublicKey } from "@solana/web3.js";
import * as nacl from "tweetnacl";
import * as bs58 from "bs58";
import { storage } from "./storage";

// Verify Solana wallet signature
export async function verifyWalletSignature(
  publicKeyString: string,
  signature: string,
  message: string
): Promise<boolean> {
  try {
    // Decode the public key
    const publicKey = new PublicKey(publicKeyString);
    const publicKeyBytes = publicKey.toBytes();

    // Decode the signature from base58
    const signatureBytes = bs58.decode(signature);

    // Convert message to bytes
    const messageBytes = new TextEncoder().encode(message);

    // Verify the signature
    const verified = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    return verified;
  } catch (error) {
    console.error("Error verifying wallet signature:", error);
    return false;
  }
}

// Middleware to check if user is authenticated via wallet
export function isWalletAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.walletAddress) {
    return next();
  }
  return res.status(401).json({ error: "Not authenticated" });
}

// Combined middleware that accepts either Replit Auth or Wallet Auth
export function isAuthenticated(req: any, res: Response, next: NextFunction) {
  // Check for Replit Auth (session.user)
  if (req.user && req.user.claims) {
    return next();
  }
  
  // Check for Wallet Auth (session.walletAddress)
  if (req.session && req.session.walletAddress) {
    return next();
  }
  
  return res.status(401).json({ error: "Not authenticated" });
}

// Get user ID from either auth method
export async function getUserFromSession(req: any): Promise<string | null> {
  // Replit Auth
  if (req.user && req.user.claims) {
    return req.user.claims.sub;
  }
  
  // Wallet Auth
  if (req.session && req.session.walletAddress) {
    const user = await storage.getUserByWallet(req.session.walletAddress);
    return user?.id || null;
  }
  
  return null;
}
