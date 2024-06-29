'use client';

// getting in client
import { PHONEBOOK_PROGRAM_ID ,getPhoneBookProgram} from '@phonebook/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';      
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function usePhoneBookProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();

  const provider = useAnchorProvider();
  const programId = PHONEBOOK_PROGRAM_ID;
  const program  = getPhoneBookProgram(provider);


  const accounts = useQuery({
    queryKey: ['phonebook', 'all', { cluster }],
    queryFn: () => program.account.phoneBookState.all(),
  });

  console.log("accounts",accounts??undefined);

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createPhoneBookEntry = useMutation({
    mutationKey: ['phonebook', 'createPhoneBookEntry', { cluster }], 
    mutationFn: async ({content,userName,userNumber, user}:{content:string; userName:string; userNumber:string; user:PublicKey}) => {
      const [PhonebookPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(userName), user.toBuffer()],
        program.programId,
      );

      return program.methods
        .createPhoneBookEntry(content, userName, userNumber)
        .accounts({ user: user })
        .rpc()
    },

    onSuccess: (signature) => {
      console.log('helooooooo')
      transactionToast(signature);
      return accounts.refetch();
    },

    onError: () => {
      toast.error('Failed to create entry')
    }

  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createPhoneBookEntry,
  };
}

export function usePhoneBookProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = usePhoneBookProgram();

  const accountQuery = useQuery({
    queryKey: ['phonebook', 'fetch', { cluster, account }],
    queryFn: () => program.account.phoneBookState.fetch(account),
  });

  const updatePhoneBookEntry = useMutation({
    mutationKey: ['phonebook', 'updatePhoneBookEntry', { cluster }], 
    mutationFn: async ({content,userName,userNumber, user}:{content:string; userName:string; userNumber:string; user:PublicKey}) => {
      const [PhonebookPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(userName), user.toBuffer()],
        program.programId,
      );
      return program.methods
        .updatePhoneBookEntry(content, userName, userNumber)
        .accounts({  user: user })
        .rpc()
    },

    onSuccess: (signature) => {
      console.log('helooooooo update')
      transactionToast(signature);
      return accounts.refetch();
    },

    onError: () => {
      toast.error('Failed to update entry')
    }

  });


  const deletePhoneBookEntry = useMutation({
    mutationKey: ['phonebook', 'deletePhoneBookEntry', { cluster, account }],
    mutationFn: async({userName}:{userName:string}) => {
      return program.methods.deletePhoneBookEntry(userName).rpc()
    },
      onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    updatePhoneBookEntry,
    deletePhoneBookEntry,
  };
}
