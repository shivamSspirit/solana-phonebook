'use client';

import { Keypair, PublicKey } from '@solana/web3.js';
import { useMemo, useState } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  useCounterProgram,
  useCounterProgramAccount,
} from './phonebook-data-access';

export function CounterCreate() {
  const { createPhoneBookEntry } = useCounterProgram();
  const { publicKey } = useWallet();
  const [userName, setUserName] = useState("");
  const [userNumber, setuserNumber] = useState("");
  const [content, setcontent] = useState("");

  const isDataValid = userName.trim() !== "" && userNumber.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (isDataValid && publicKey) {
      createPhoneBookEntry.mutateAsync({ content, userName, userNumber, user: publicKey });
    }
  }

  return (
    <div>
      <input className='input input-borderd' type='string' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='add user name' />
      <input className='input input-borderd' type='string' value={userNumber} onChange={(e) => setuserNumber(e.target.value)} placeholder='add user mobile number' />
      <textarea className='textarea textarea-borderd' value={content} onChange={(e) => setcontent(e.target.value)} placeholder='add user content' />

      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={handleSubmit}
        disabled={createPhoneBookEntry.isPending || !isDataValid}
      >
        Create {createPhoneBookEntry.isPending && '...'}
      </button>
    </div>
  );
}

export function CounterList() {
  const { accounts, getProgramAccount } = useCounterProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account: any) => (
            <CounterCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  );
}

function CounterCard({ account }: { account: PublicKey }) {
  const {
    accountQuery,
    updatePhoneBookEntry,
    deletePhoneBookEntry,
  } = useCounterProgramAccount({ account });

  const { publicKey } = useWallet();
  const [content, setContent] = useState("");

  const userName = accountQuery.data?.userName;
  const userNumber = accountQuery.data?.userNumber;


  const isDataValid = userName?.trim() !== "" && userNumber?.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (isDataValid && publicKey && userName) {
      updatePhoneBookEntry.mutateAsync({ content, userName, userNumber, user: publicKey });
    }
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => accountQuery.refetch()}
          >
            {accountQuery.data?.userName}
          </h2>
          <p>{accountQuery.data?.userNumber}</p>
          <p>{accountQuery.data?.content}</p>

          <div className="card-actions justify-around">

            <textarea className='textarea textarea-bordered' value={content} onChange={(e) => setContent(e.target.value)} placeholder='update user content' />

            <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={handleSubmit}
              disabled={updatePhoneBookEntry.isPending || !isDataValid}
            >
              update {updatePhoneBookEntry.isPending && '...'}
            </button>

          </div>


          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={() => {
                if (
                  !window.confirm(
                    'Are you sure you want to close this account?'
                  )
                ) {
                  return;
                }
                if(userName){
                  return deletePhoneBookEntry.mutateAsync({userName});
                }    
              }}
              disabled={deletePhoneBookEntry.isPending}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
