'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { usePhoneBookProgram } from './phonebook-data-access';
import { PhoneBookCreate, PhoneBookList } from './phonebook-ui';

export default function CounterFeature() {
  const { publicKey } = useWallet();
  const { programId } = usePhoneBookProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="PhoneBook"
        subtitle={
          'Create a new account by clicking the "Create" button(this button visible after you enter phonebook values). The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (create, update, delete phone book entries).'
        }
      >
        <p className="mb-6">
         PhoneBook Solana ProgramID: <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <PhoneBookCreate />
      </AppHero>
      <PhoneBookList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
