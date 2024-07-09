// Here we export some useful types and functions for interacting with the Anchor program.

import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import idl from '../target/idl/phonebook.json';
import type { Phonebook, IDL } from '../target/types/phonebook';

// Re-export the generated IDL and type
export { Phonebook, idl, IDL };

// The programId is imported from the program IDL.
export const PHONEBOOK_PROGRAM_ID = new PublicKey(idl.address);


export function getPhoneBookProgram(provider: AnchorProvider) {
  return new Program(idl as Phonebook, provider);
}

// This is a helper function to get the program ID for the phonebook program depending on the cluster.
export function getPhoneBookProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the phonebook program on devnet and testnet.
      return new PublicKey('5XRwMzzgnQcHa3mi7p1gUdCVw8ed4LEnBVExMeFcq1wv');
    case 'mainnet-beta':
    default:
      return PHONEBOOK_PROGRAM_ID;
  }
}
